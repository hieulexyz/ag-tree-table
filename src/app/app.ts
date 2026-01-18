import { Component, signal } from '@angular/core';
import {TreeTableComponent} from './tree-table/tree-table.component';
import {TreeNode} from './tree-table/tree-table.model';
import {ColDef} from 'ag-grid-community';
import {CategoryTree} from './category-tree/category-tree';

@Component({
  selector: 'app-root',
  imports: [CategoryTree],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  columns: ColDef[] = [
    { headerName: 'Type', field: 'type', flex: 1 },
    { headerName: 'Owner', field: 'owner', flex: 1 },
    {
      headerName: 'Status',
      field: 'status',
      flex: 1,
      cellRenderer: (p: any) =>
        p.value === 'ACTIVE' ? '🟢 Active' : '🔴 Inactive'
    }
  ];

  data: TreeNode[] = [
    {
      id: '1',
      name: 'Finance',
      level: 0,
      expanded: true,
      type: 'Department',
      owner: 'Alice',
      status: 'ACTIVE',
      children: [
        {
          id: '1-1',
          name: 'Accounting',
          level: 1,
          expanded: true,
          owner: 'Bob',
          children: [
            {
              id: '1-1-1',
              name: 'AP',
              level: 2,
              status: 'ACTIVE'
            },
            {
              id: '1-1-2',
              name: 'AR',
              level: 2,
              status: 'INACTIVE'
            }
          ]
        },
        {
          id: '1-2',
          name: 'Payroll',
          level: 1,
          owner: 'Chris'
        }
      ]
    },
    {
      id: '2',
      name: 'IT',
      level: 0,
      expanded: true,
      type: 'Department',
      owner: 'David',
      children: [
        {
          id: '2-1',
          name: 'Infrastructure',
          level: 1
        },
        {
          id: '2-2',
          name: 'Development',
          level: 1
        }
      ]
    }
  ];
  quickFilter: any;

  onFilterInput($event: Event) {

  }
}
