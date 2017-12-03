import { Component } from '@angular/core';

@Component({
  selector: 'hm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  prodHotFix() {
    console.log('pod hotfix');
  }
}
