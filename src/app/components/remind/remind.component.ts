import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
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
    let date = new Date();
    this.httpservice.postarchive('notes/addUpdateReminderNotes',
      {
        "noteIdList": [this.reminder.id],
        "reminder": new Date(date.getFullYear(), date.getMonth(),date.getDate()+1)
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
