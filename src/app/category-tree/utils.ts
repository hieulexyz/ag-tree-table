import {CategoryTreeNode} from './category-tree';
import {TreeNode} from '../tree-table/tree-table.model';

export interface ProductRow {
  id: number;
  name: string;
  description?: string;
  category_level_1: string;
  category_level_2?: string;
  category_level_3?: string;
  category_level_4?: string;
}

const UNDEFINED_LABEL = 'Chưa phân loại';
const UNDEFINED_KEY = '__UNDEFINED__';

export function getOrCreateNode(
  map: Map<string, TreeNode>,
  key: string,
  name: string,
  level: number
): CategoryTreeNode {
  if (!map.has(key)) {
    map.set(key, {
      id: key,
      name,
      level,
      expanded: true,
      quantity: 0,
      children: []
    });
  }
  return <CategoryTreeNode>map.get(key)!;
}

function extractCategoryPath(p: ProductRow): string[] {
  return [
    p.category_level_1,
    p.category_level_2,
    p.category_level_3,
    p.category_level_4
  ].filter(
    (v): v is string => typeof v === 'string' && v.trim().length > 0
  );
}



function buildFullCategoryPath(
  p: ProductRow
): string[] {
  const raw = [
    p.category_level_1,
    p.category_level_2,
    p.category_level_3,
    p.category_level_4
  ];

  const result: string[] = [];

  for (let i = 0; i < raw.length; i++) {
    if (raw[i] && raw[i]!.trim().length > 0) {
      result.push(raw[i]!);
    } else {
      result.push(UNDEFINED_LABEL);
    }
  }

  return result;
}

export function buildCategoryTree(
  products: ProductRow[]
): CategoryTreeNode[] {

  const roots = new Map<string, CategoryTreeNode>();

  for (const p of products) {
    const path = buildCategoryPathSmart(p);

    let currentMap = roots;
    let parent: CategoryTreeNode | null = null;

    path.forEach((name, level) => {
      const key = parent
        ? `${parent.id}|${name === UNDEFINED_LABEL ? UNDEFINED_KEY : name}`
        : name;

      let node = currentMap.get(key);

      if (!node) {
        node = {
          id: key,
          name,
          level,
          expanded: true,
          quantity: 0,
          children: []
        };

        currentMap.set(key, node);
        parent?.children!.push(node);
      }

      parent = node;
      currentMap = new Map(
        node.children!.map(c => [c.id, c])
      );
    });

    parent!.quantity += 1;
  }

  return Array.from(roots.values());
}


export function aggregateQuantity(
  node: CategoryTreeNode
): number {
  if (!node.children?.length) {
    return node.quantity;
  }

  node.quantity = node.children
    .map(c => aggregateQuantity(<CategoryTreeNode>c))
    .reduce((a, b) => a + b, 0);

  return node.quantity;
}

function getDeepestLevel(p: ProductRow): number {
  if (p.category_level_4) return 3;
  if (p.category_level_3) return 2;
  if (p.category_level_2) return 1;
  return 0;
}

function buildCategoryPathSmart(
  p: ProductRow
): string[] {

  const raw = [
    p.category_level_1,
    p.category_level_2,
    p.category_level_3,
    p.category_level_4
  ];

  const deepest = getDeepestLevel(p);
  const result: string[] = [];

  for (let level = 0; level <= deepest; level++) {
    const value = raw[level];

    if (value && value.trim().length > 0) {
      result.push(value);
    } else {
      result.push(UNDEFINED_LABEL);
    }
  }

  return result;
}
