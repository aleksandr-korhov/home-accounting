import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { BillService } from '../shared/services/bill.service';
import { CategoryService } from '../shared/services/category.service';
import { EventService } from '../shared/services/event.service';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { HmEvent } from '../shared/models/event.model';

@Component({
  selector: 'hm-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  bill: Bill;
  categories: Category[];
  events: HmEvent[];
  sub: Subscription;

  constructor(private billService: BillService,
              private categoryService: CategoryService,
              private eventService: EventService) {

  }

  ngOnInit() {
    this.sub = Observable.combineLatest(this.billService.getBill(), this.categoryService.getCategories(), this.eventService.getEvents())
      .subscribe(([bill, categories, events]: [Bill, Category[], HmEvent[]]) => {
        this.bill = bill;
        this.categories = categories;
        this.events = events;
        this.isLoaded = true;
      });
  }

  getCategoryCost(cat: Category): number {
    const catEvents: HmEvent[] = this.events.filter((event: HmEvent) => event.category === cat.id && event.type === 'outcome');
    // return catEvents.map((ev: HmEvent) => ev.amount).reduce((sum, curr) => sum + curr);
    return catEvents.reduce((sum, e) => sum + e.amount, 0);
  }

  getCatPercent(cat: Category) {
    const catCost = this.getCategoryCost(cat);
    return (catCost * 100) / cat.capacity;
  }

  getColorClass(cat: Category) {
    let colorClass = 'warning';
    const catPercent = this.getCatPercent(cat);

    if (catPercent < 30) {
      colorClass = 'success';
    } else if (catPercent > 60) {
      colorClass = 'danger';
    } else {
      colorClass = 'warning';
    }

    return colorClass;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
