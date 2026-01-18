import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IHeaderAngularComp } from 'ag-grid-angular';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <span (click)="sort()" style="cursor:pointer">
      {{ params.displayName }}
      {{ dir === 'asc' ? '▲' : dir === 'desc' ? '▼' : '' }}
    </span>
  `
})
export class TreeHeaderComponent
  implements IHeaderAngularComp {

  params!: any;
  dir: 'asc' | 'desc' | null = null;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  sort(): void {
    this.dir = this.dir === 'asc' ? 'desc' : 'asc';
    this.params.context.sortTreeByName(this.dir);
  }
}
