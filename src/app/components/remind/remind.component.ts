import { Component, OnInit, Input, Output, EventEmitter,OnDestroy } from '@angular/core';
import { LoggerService } from '../../core/services/logger/logger.service';
import { FormControl } from '@angular/forms';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-remind',
  templateUrl: './remind.component.html',
  styleUrls: ['./remind.component.scss']
})
export class RemindComponent implements OnInit , OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() reminder;
  @Output() reminderEmit = new EventEmitter();
  @Output() dateEmit = new EventEmitter();
  private token = localStorage.getItem('token');
  private body = {};
  private currentDate = new Date();
  reminders: any[] = [
    { value: 'morning', viewPeriod: 'Morning', viewTime: '08:00 AM' },
    { value: 'afternoon', viewPeriod: 'Afternoon', viewTime: '01:00 PM' },
    { value: 'evening', viewPeriod: 'Evening', viewTime: '06:00 PM' },
    { value: 'night', viewPeriod: 'Night', viewTime: '09:00 PM' }];
  reminddate;
  constructor(private notesService: NotesService) { }

  ngOnInit() {
  }


  remindMeToday() {
    let date = new Date();
    var dateExample = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 20, 0, 0, 0)
    this.dateEmit.emit(dateExample);
    this.notesService.addUpdateReminderNotes({
      "noteIdList": [this.reminder.id],
      "reminder": dateExample

    }).pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {

        LoggerService.log("POST Request is successful ", data);
        this.reminderEmit.emit({
        })
      },
      error => {
        LoggerService.log("Error", error);
      })
  }

  remindMeTommorow() {
    let date = new Date();
    var dateExample1 = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 8, 0, 0, 0)
    this.dateEmit.emit(dateExample1);
    this.notesService.addUpdateReminderNotes(
      {
        "noteIdList": [this.reminder.id],
        "reminder": dateExample1
      }).pipe(takeUntil(this.destroy$)).subscribe(data => {
        LoggerService.log('POST is successfull ', data);
        this.reminderEmit.emit({
        })
      },
        error => {
          LoggerService.log("Error", error);
        })
  }

  remindMeNextWeek() {
    let date = new Date();
    var dateExample2 = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7, 8, 0, 0, 0)
    this.dateEmit.emit(dateExample2);
    this.notesService.addUpdateReminderNotes(
      {
        "noteIdList": [this.reminder.id],
        "reminder": dateExample2
      }).pipe(takeUntil(this.destroy$)).subscribe(data => {
        LoggerService.log('POST is successfull ', data);
        this.reminderEmit.emit({
        })
      },
        error => {
          LoggerService.log("Error", error);
        })
  }



  reminderList() {

    this.notesService.getReminderNotesList().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        LoggerService.log("GET Request is successful ", data)
      },
      error => {
        LoggerService.error("Error ", error)
      });
  }

  show = true
  datePickReminder() {
    this.show = !this.show;
  }
  backPressDatepicker() {
    this.show = true;
  }
  reminderBody = {
    "date": new FormControl(new Date()),
    "time": ""
  }

  addRemCustom(date, timing) {

    timing.match('^[0-2][0-3]:[0-5][0-9]$');

    if (timing == '8:00 AM') {
      this.body = {
        "noteIdList": [this.reminder.id],
        "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0, 0)
      }
      this.notesService.addUpdateReminderNotes(this.body).pipe(takeUntil(this.destroy$)).subscribe((result) => {

        this.reminderEmit.emit({
        })
      })
    } else if (timing == '1:00 PM') {
      this.body = {
        "noteIdList": [this.reminder.id],
        "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0, 0, 0)
      }
      this.notesService.addUpdateReminderNotes(this.body).pipe(takeUntil(this.destroy$)).subscribe((result) => {

        this.reminderEmit.emit({
        })
      })
    } else if (timing == '6:00 PM') {
      this.body = {
        "noteIdList": [this.reminder.id],
        "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0, 0)
      }
      this.notesService.addUpdateReminderNotes(this.body).pipe(takeUntil(this.destroy$)).subscribe((result) => {

        this.reminderEmit.emit({
        })
      })
    } else if (timing == '9:00 PM') {
      this.body = {
        "noteIdList": [this.reminder.id],
        "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 21, 0, 0, 0)
      }
      this.notesService.addUpdateReminderNotes(this.body).pipe(takeUntil(this.destroy$)).subscribe((result) => {

        this.reminderEmit.emit({
        })
      })
    } else if (timing == this.reminderBody.time) {
      var splitTime = this.reminderBody.time.split("", 8);
      var hour = Number(splitTime[0] + splitTime[1]);
      var minute = Number(splitTime[3] + splitTime[4]);
      var ampm = (splitTime[6] + splitTime[7]);

      if (ampm == 'AM' || ampm == 'am') {
        this.body = {
          "noteIdList": [this.reminder.id],
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0, 0)
        }
        this.notesService.addUpdateReminderNotes(this.body).pipe(takeUntil(this.destroy$)).subscribe((result) => {

          this.reminderEmit.emit({
          })
        })
      } else if (ampm == 'PM' || ampm == 'pm') {
        this.body = {
          "noteIdList": [this.reminder.id],
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour + 12, minute, 0, 0)
        }
        this.notesService.addUpdateReminderNotes(this.body).pipe(takeUntil(this.destroy$)).subscribe((result) => {

          this.reminderEmit.emit({
          })
        })
      }

    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}