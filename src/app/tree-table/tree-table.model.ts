export interface TreeNode {
  id: string;
  name: string;
  level: number;
  expanded?: boolean;
  children?: TreeNode[];

  [key: string]: any;
}
