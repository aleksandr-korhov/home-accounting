import { Component, Input, OnInit } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'hm-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;

  dollar: number;
  euro: number;

  constructor() { }

  ngOnInit() {
    const rates = this.currency.rates;
    const billValue = this.bill.value;
    this.dollar = billValue * rates.USD;
    this.euro = billValue * rates.EUR;
  }

}
