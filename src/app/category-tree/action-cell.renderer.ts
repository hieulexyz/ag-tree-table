import {CategoryTreeNode} from './category-tree';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {Component} from '@angular/core';

@Component({
  standalone: true,
  template: `
    <button
      class="btn-view"
      (click)="viewDetail($event)">
      Xem chi tiết
    </button>
  `,
  styles: [`
    .btn-view {
      padding: 2px 8px;
      cursor: pointer;
    }
  `]
})
export class ActionCellRenderer
  implements ICellRendererAngularComp {

  node!: CategoryTreeNode;
  isLeaf = false;
  params!: any;

  agInit(params: any): void {
    this.params = params;
    this.node = params.data;
    this.isLeaf = !this.node.children?.length;
  }

  refresh(): boolean {
    return false;
  }

  viewDetail(event: MouseEvent): void {
    event.stopPropagation();
    this.params.context.onViewDetail(this.node);
  }
}
