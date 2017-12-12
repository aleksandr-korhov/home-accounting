import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';

import { Category } from '../../shared/models/category.model';
import { HmEvent } from '../../shared/models/event.model';
import { EventService } from '../../shared/services/event.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { Message } from '../../../shared/models/message.model';

@Component({
  selector: 'hm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {
  @Input() categoryList: Category[];

  sub: Subscription;

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];
  message: Message = null;

  constructor(private eventService: EventService,
              private billService: BillService) {
  }

  ngOnInit() {
  }

  async onSubmit(form: NgForm) {
    let {type, amount, category, description} = form.value;

    if (amount < 0) {
      amount *= -1;
    }

    const event = new HmEvent(type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'), description);

    const bill: Bill = await this.billService.getBill().toPromise();

    let value = 0;

    if (type === 'outcome') {
      if (amount > bill.value) {
        this.message = new Message('danger', 'Не хватает средств.');
        setTimeout(() => {
          this.message = null;
        }, 5000);
        return;
      } else {
        value = bill.value - amount;
      }
    } else {
      value = bill.value + amount;
    }

    bill.value = value;

    this.sub = this.billService.updateBill(bill)
      .mergeMap(() => this.eventService.addEvent(event))
      .subscribe(data => {
        form.setValue({
          category: 1,
          type: 'outcome',
          amount: 1,
          description: ''
        });
      });

    // this.eventService.addEvent(event).subscribe((e: HmEvent) => console.log(e));
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
