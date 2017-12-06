import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/models/category.model';

@Component({
  selector: 'hm-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  categories: Category[] = [];

  constructor() { }

  ngOnInit() {
  }

  newCategiryAdded(category: Category) {
    this.categories.push(category);
  }

}
