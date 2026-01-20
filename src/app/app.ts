import { Component, signal } from '@angular/core';
import {CategoryTree} from './category-tree/category-tree';
import {CategoryHierarchyTable} from './category-tree/category-hierarchy-table.component';

@Component({
  selector: 'app-root',
  imports: [CategoryTree, CategoryHierarchyTable],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
