import { Component } from '@angular/core';
import {TreeNode} from '../tree-table/tree-table.model';
import {TreeTableComponent} from '../tree-table/tree-table.component';
import {ColDef} from 'ag-grid-community';
import {ActionCellRenderer} from './action-cell.renderer';

export interface CategoryTreeNode extends TreeNode {
  quantity: number;
}

@Component({
  selector: 'app-category-tree',
  imports: [
    TreeTableComponent
  ],
  templateUrl: './category-tree.html',
  styleUrl: './category-tree.scss',
})
export class CategoryTree {
  columns: ColDef[] = [
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

  treeData: CategoryTreeNode[] = [
    {
      id: '1',
      name: 'Điện tử',
      level: 0,
      expanded: true,
      quantity: 0,
      children: [
        {
          id: '1-1',
          name: 'Laptop',
          level: 1,
          expanded: false,
          quantity: 0,
          children: [
            {
              id: '1-1-1',
              name: 'Gaming',
              level: 2,
              expanded: false,
              quantity: 0,
              children: [
                {
                  id: '1-1-1-1',
                  name: 'Asus ROG',
                  level: 3,
                  quantity: 120
                },
                {
                  id: '1-1-1-2',
                  name: 'MSI',
                  level: 3,
                  quantity: 80
                }
              ]
            }
          ]
        }
      ]
    }
  ];


}
