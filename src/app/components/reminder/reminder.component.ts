import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/core/services/notes/notes.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  private remindarray: any = [];
  private token = localStorage.getItem('token')

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.reminderList();
  }

  reminderList() {

    this.notesService.getReminderNotesList().subscribe(
      (data) => {
        this.remindarray = data['data'].data;
        this.remindarray.sort((a: any, b: any) =>
          new Date(a.reminder).getTime() - new Date(b.reminder).getTime()
        );
      },
      error => {

      });


  }

}
