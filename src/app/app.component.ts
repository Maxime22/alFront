import { Component } from '@angular/core';
import { RouteHistory } from './services/routeHistory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'alFront';

  // CALLED ONLY ONE TIME (initialization of route history)
  constructor(routeHistory: RouteHistory) {
    routeHistory.loadRouting();
  }
  
}
