import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hm-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

  @Input() currency: any;
  currencies: string[] = ['USD', 'EUR'];

  constructor() { }

  ngOnInit() {
    console.log(this.currency);
  }

}
