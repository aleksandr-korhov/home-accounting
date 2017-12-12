import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category.model';
import { Message } from '../../../shared/models/message.model';

@Component({
  selector: 'hm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {
  @Output() onCategoryAdd = new EventEmitter<Category>();

  message: Message = null;
  sub: Subscription;

  constructor(private categoryService: CategoryService) { }

  onSubmit(form: NgForm) {
    let {name, capacity} = form.value;

    if (capacity < 0) {
      capacity *= -1;
    }

    const category = new Category(name, capacity);

    this.sub = this.categoryService.addCategory(category).subscribe(
      (newCategory: Category) => {
        form.reset();
        form.form.patchValue({capacity: 1});
          this.onCategoryAdd.emit(newCategory);
          this.message = new Message('success', 'Категория добавлена');
          setTimeout(() => {
            this.message = null;
          }, 5000);
        },
      err => {
          console.log(err);
          this.message = new Message('danger', 'Категория не добавлена');
          setTimeout(() => {
            this.message = null;
          }, 5000);
        });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
