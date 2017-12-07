import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { CategoryService } from '../../shared/services/category.service';
import { Message } from '../../../shared/models/message.model';

@Component({
  selector: 'hm-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  @Input() categoryList: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory: Category;

  message: Message = null;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.onCategoryChange();
  }

  onSubmit(form) {
    let {name, capacity} = form.value;

    if (capacity < 0) {
      capacity *= -1;
    }

    const category = new Category(name, capacity, +this.currentCategoryId);
    this.categoryService.updateCategory(category).subscribe(
      (cat: Category) => {
          this.onCategoryEdit.emit(cat);
          this.message = new Message('success', 'Категория изменена');
          setTimeout(() => {
            this.message = null;
          }, 5000);
        },
        err => {
          console.log(err);
          this.message = new Message('danger', 'Категория не изменена');
          setTimeout(() => {
            this.message = null;
          }, 5000);
        });
  }

  onCategoryChange() {
    this.currentCategory = this.categoryList.find(cat => cat.id === +this.currentCategoryId);
  }
}
