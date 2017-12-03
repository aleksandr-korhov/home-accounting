import { Component } from '@angular/core';

@Component({
  selector: 'hm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  addDevMethod() {
    console.log('dev method');
  }
}
