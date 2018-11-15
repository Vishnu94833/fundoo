import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  remindarray:any=[];
  token=localStorage.getItem('token')

  constructor(private httpservice: HttpService) { }

  ngOnInit() {
    this.reminderList();
  }

  reminderList() {
    
    this.httpservice.getnotes('notes/getReminderNotesList', this.token).subscribe(
      (data) => {
            this.remindarray=data['data'].data;
            this.remindarray.sort();
      },
      error => {

      });


  }

}
