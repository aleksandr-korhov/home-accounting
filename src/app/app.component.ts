import { Component } from '@angular/core';

@Component({
  selector: 'hm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  prodMethod() {
    console.log('prod method');
  }
}
