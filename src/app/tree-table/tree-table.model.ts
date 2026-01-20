export interface TreeNode<T = any> {
  id: string;
  name: string;
  level: number;
  expanded?: boolean;
  children?: T[];
  path: string[];

  [key: string]: any;
}
