import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

import { Category } from '../../shared/models/category.model';
import { HmEvent } from '../../shared/models/event.model';

@Component({
  selector: 'hm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  @Input() categoryList: Category[];
  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ]

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    let {type, amount, category, description} = form.value;
    console.log(type, amount, category, description);

    if (amount < 0) {
      amount *= -1;
    }

    const event = new HmEvent(type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'), description);
    console.log(event);
  }

}
