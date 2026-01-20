import {Component, OnInit} from '@angular/core';
import {TreeNode} from '../tree-table/tree-table.model';
import {TreeTableComponent} from '../tree-table/tree-table.component';
import {ColDef} from 'ag-grid-community';
import {ActionCellRenderer} from './action-cell.renderer';
import {aggregateQuantity, buildCategoryTree, ProductRow} from './utils';
import {LevelTreeCellRenderer} from '../tree-table/level-tree-cell.renderer';
import {HierarchyTableComponent} from '../tree-table/hierarchy-table.component';

export interface CategoryTreeNode extends TreeNode<CategoryTreeNode> {
  quantity: number;
}

@Component({
  selector: 'app-category-hierarchy-table',
  imports: [
    HierarchyTableComponent
  ],
  templateUrl: './category-hierarchy-table.component.html',
  styleUrl: './category-hierarchy-table.component.scss',
})
export class CategoryHierarchyTable implements OnInit {

  levelColumn = (level: number, header: string): ColDef => ({
    headerName: header,
    flex: 1,
    cellRenderer: LevelTreeCellRenderer,
    cellRendererParams: {
      level
    }
  });

  columns: ColDef[] = [
    this.levelColumn(0, 'Level 1'),
    this.levelColumn(1, 'Level 2'),
    this.levelColumn(2, 'Level 3'),
    this.levelColumn(3, 'Level 4'),
    {
      headerName: 'Số lượng',
      field: 'quantity',
      width: 120,
      cellClass: 'text-right',
      valueFormatter: p =>
        p.value != null ? p.value.toLocaleString() : ''
    },
    {
      headerName: 'Action',
      width: 140,
      cellRenderer: ActionCellRenderer
    }
  ];

  products: ProductRow[] = [
    {
      id: 1,
      name: 'Product 1',
      category_level_1: 'Điện tử',
      category_level_2: 'Laptop',
      category_level_3: 'Gaming',
      category_level_4: 'Asus'
    },
    {
      id: 2,
      name: 'Product 2',
      category_level_1: 'Điện tử',
      category_level_2: 'Laptop',
      category_level_3: 'Gaming'
    },
    {
      id: 3,
      name: 'Product 3',
      category_level_1: 'Điện tử',
      category_level_2: 'Laptop'
    },
    {
      id: 4,
      name: 'Product 4',
      category_level_1: 'Điện tử'
    },
    {
      id: 5,
      name: 'Product 5',
      category_level_1: 'Điện tử',
      category_level_2: 'Laptop',
      category_level_3: 'Gaming',
      category_level_4: 'Dell'
    },
    {
      id: 6,
      name: 'Product 6',
      category_level_1: 'Điện tử',
      category_level_2: 'Loa',
      category_level_3: 'Cao cấp',
    },
    {
      id: 7,
      name: 'Product 7',
      category_level_1: 'Điện tử',
      category_level_2: 'Loa',
      category_level_3: 'Trung cấp',
    },
    {
      id: 8,
      name: 'Product 8',
      category_level_1: 'Điện tử',
      category_level_2: 'Loa',
      category_level_3: 'Trung cấp',
      category_level_4: 'Hàng Nhật Tảo',
    },
    {
      id: 9,
      name: 'Product 9',
      category_level_1: 'Điện tử',
      category_level_2: 'Loa',
      category_level_4: 'Hàng Nhật Tảo',
    },
    {
      id: 10,
      name: 'Product 10',
      category_level_1: 'Điện tử',
      category_level_4: 'Hàng Nhật Tảo',
    }
  ];

  treeData: CategoryTreeNode[] = [];

  ngOnInit(): void {
    this.treeData = buildCategoryTree(this.products);
    this.treeData.forEach(t => aggregateQuantity(t))
  }

}
