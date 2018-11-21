import { Component, OnInit,OnDestroy } from '@angular/core';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { Notedetails } from 'src/app/core/model/notedetails';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  private remindarray: any = [];
  private token = localStorage.getItem('token')
  private array: Notedetails[] = [];

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.reminderList();
  }

  reminderList() {

    this.notesService.getReminderNotesList().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        let myReminder = data['data']['data'];
        this.remindarray = myReminder;
        this.remindarray.sort((a: any, b: any) =>
          new Date(a.reminder).getTime() - new Date(b.reminder).getTime()
        );
      },
      error => {

      });


  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
