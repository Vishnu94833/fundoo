import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-remind',
  templateUrl: './remind.component.html',
  styleUrls: ['./remind.component.css']
})
export class RemindComponent implements OnInit {

  @Input() reminder;
  token = localStorage.getItem('token');
  constructor(private httpservice: HttpService) { }

  ngOnInit() {
  }


  remindMe() {
    this.httpservice.postarchive('notes/' + this.reminder.id + '/addUpdateReminderNotes',
      {
        "title": "string",
        "description": "string",
        "reminder": [
          "2018-11-06T04:47:17.235Z"
        ]
      }, this.token).subscribe(
        (data) => {

          console.log("POST Request is successful ", data);

        },
        error => {
          console.log("Error", error);
        }
      )

  }

}
