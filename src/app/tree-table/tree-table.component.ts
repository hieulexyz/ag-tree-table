import { Component, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  GridApi,
  GridOptions,
  themeMaterial
} from 'ag-grid-community';

import { TreeNode } from './tree-table.model';
import { TreeCellRenderer } from './tree-cell.renderer';
import { TreeHeaderComponent } from './tree-header.component';

@Component({
  standalone: true,
  selector: 'app-tree-table',
  imports: [AgGridAngular],
  template: `
    <ag-grid-angular
      class="ag-theme-quartz"
      style="width: 100%; height: 100%"
      [rowData]="rowData"
      [columnDefs]="internalColumnDefs"
      [gridOptions]="gridOptions"
      (gridReady)="onGridReady($event)">
    </ag-grid-angular>
  `
})
export class TreeTableComponent {

  private gridApi!: GridApi;

  /* =====================
   * INPUT API
   * ===================== */

  /** 🔹 Tree source of truth */
  @Input({ required: true })
  treeData: TreeNode[] = [];

  /** 🔹 Columns ngoài tree column */
  @Input()
  columns: ColDef[] = [];

  /** 🔹 Tree column header */
  @Input()
  treeHeaderName = 'Name';

  /* =====================
   * INTERNAL STATE
   * ===================== */

  rowData: TreeNode[] = [];
  internalColumnDefs: ColDef[] = [];

  /* =====================
   * GRID OPTIONS
   * ===================== */

  gridOptions: GridOptions = {
    theme: themeMaterial,

    defaultColDef: {
      resizable: true,
      sortable: false
    },

    context: {
      toggleNode: (node: TreeNode) => this.toggleNode(node),
      sortTreeByName: (dir: 'asc' | 'desc') =>
        this.sortTreeByName(dir),
      onViewDetail: (node: TreeNode) => {
        console.log(node);
      }
    }
  };

  /* =====================
   * GRID READY
   * ===================== */

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.buildColumnDefs();
    this.rebuildRowData();
  }

  /* =====================
   * COLUMN SETUP
   * ===================== */

  private buildColumnDefs(): void {
    this.internalColumnDefs = [
      {
        headerName: this.treeHeaderName,
        field: 'name',
        flex: 2,
        cellRenderer: TreeCellRenderer,
        headerComponent: TreeHeaderComponent
      },
      ...this.columns
    ];
  }

  /* =====================
   * TREE OPERATIONS
   * ===================== */

  toggleNode(node: TreeNode): void {
    node.expanded = !node.expanded;
    this.rebuildRowData();
  }

  sortTreeByName(dir: 'asc' | 'desc'): void {
    const factor = dir === 'asc' ? 1 : -1;

    this.sortTreeRecursive(this.treeData, (a, b) =>
      factor * a.name.localeCompare(b.name)
    );

    this.rebuildRowData();
  }

  /* =====================
   * INTERNAL HELPERS
   * ===================== */

  private rebuildRowData(): void {
    this.rowData = this.flattenTree(this.treeData, []);
  }

  private flattenTree(
    nodes: TreeNode[],
    result: TreeNode[]
  ): TreeNode[] {
    for (const node of nodes) {
      result.push(node);

      if (node.expanded && node.children?.length) {
        this.flattenTree(node.children, result);
      }
    }
    return result;
  }

  private sortTreeRecursive(
    nodes: TreeNode[],
    compare: (a: TreeNode, b: TreeNode) => number
  ): void {
    nodes.sort(compare);

    for (const node of nodes) {
      if (node.children?.length) {
        this.sortTreeRecursive(node.children, compare);
      }
    }
  }
}
