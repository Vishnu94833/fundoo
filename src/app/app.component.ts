import { Component } from '@angular/core';
import {HttpService} from '../app/services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fundoo';
  // coins=[];
  constructor(private httpservice: HttpService)
  {
    // this.coins = httpservice.getMyItems();
  }
}
