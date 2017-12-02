import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hm-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  links = [
    {name: 'bill', url: 'Счет'},
    {name: 'history', url: 'История'},
    {name: 'planning', url: 'Планирование'},
    {name: 'records', url: 'Запись'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
