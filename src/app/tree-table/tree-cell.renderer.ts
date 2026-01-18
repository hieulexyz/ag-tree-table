import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { TreeNode } from './tree-table.model';

@Component({
  standalone: true,
  selector: 'tree-cell',
  imports: [CommonModule],
  template: `
    <div class="tree-cell" [style.paddingLeft.px]="node.level * 20">
      @if (hasChildren) {
        <span class="toggle" (click)="onToggle($event)">
          {{ node.expanded ? '▼' : '▶' }}
        </span>
      }
      <span class="label">{{ node.name }}</span>
    </div>
  `,
  styles: [`
    .tree-cell {
      display: flex;
      align-items: center;
    }
    .toggle {
      width: 14px;
      cursor: pointer;
      user-select: none;
      margin-right: 4px;
    }
    .label {
      white-space: nowrap;
    }
  `]
})
export class TreeCellRenderer
  implements ICellRendererAngularComp {

  node!: TreeNode;
  hasChildren = false;
  params!: any;

  agInit(params: any): void {
    this.params = params;
    this.bindNode(params);
  }

  refresh(params: any): boolean {
    this.bindNode(params);
    return true;
  }

  private bindNode(params: any): void {
    this.node = params.data as TreeNode;
    this.hasChildren = !!this.node.children?.length;
  }

  onToggle(event: MouseEvent): void {
    event.stopPropagation(); // ⛔ bắt buộc
    this.params.context.toggleNode(this.node);
  }
}
