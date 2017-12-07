import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/models/category.model';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'hm-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  isLoaded = false;

  categories: Category[] = [];

  constructor(private categorySerice: CategoryService) { }

  ngOnInit() {
    this.categorySerice.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.isLoaded = true;
      });
  }

  newCategiryAdded(category: Category) {
    this.categories.push(category);
  }

  categoryWasEdited(category: Category) {
    const idx = this.categories.findIndex(cat => cat.id === category.id + 5);

    if (idx > 0) {
      this.categories[idx] = category;
    }
  }

}
