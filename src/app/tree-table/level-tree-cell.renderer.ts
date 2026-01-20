import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {TreeNode} from './tree-table.model';

@Component({
  standalone: true,
  template: `
    <div class="tree-cell">
      @if (label) {
        <span>{{ label }}</span>
        @if (hasToggle) {
          <span class="toggle" (click)="toggle($event)">
            {{ node.expanded ? '▼' : '▶' }}
          </span>
        }
      }
    </div>
  `
})
export class LevelTreeCellRenderer
  implements ICellRendererAngularComp {

  node!: TreeNode;
  columnLevel!: number;
  label: string | null = null;
  hasToggle = false;
  params!: any;

  agInit(params: any): void {
    this.params = params;
    this.node = params.data;
    this.columnLevel = params.colDef.cellRendererParams.level;

    // ⭐ CỐT LÕI
    this.label = this.node.path[this.columnLevel] ?? null;

    // toggle chỉ xuất hiện tại level của node
    this.hasToggle =
      this.node.level === this.columnLevel &&
      !!this.node.children?.length;
  }

  toggle(e: MouseEvent) {
    e.stopPropagation();
    this.params.context.toggleNode(this.node);
  }

  refresh(): boolean {
    return false;
  }
}
