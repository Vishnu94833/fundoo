import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { EventEmitter } from 'protractor';
import { MatDialog } from '@angular/material';
import { UpdatenotesComponent } from '../updatenotes/updatenotes.component';
import { HttpService } from '../../core/services/http/http.service';
import { SearchsharingService } from '../../core/services/dataservice/searchsharing.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-collectionnotes',
  templateUrl: './collectionnotes.component.html',
  styleUrls: ['./collectionnotes.component.scss']
})
export class CollectionnotesComponent implements OnInit {


  constructor(public dialog: MatDialog, private httpservice: HttpService,
    private dataService: SearchsharingService,
    private router: Router) {
    this.dataService.currentChipEvent.subscribe(
      message => {
        if (message)
          this.addnotes.emit({});
      }
    )
  }

  @Input() cardadded;
  @Input() inputData;
  @Input() notesOption;
  @Output() addnotes = new EventEmitter();
  toggle = false;
  token = localStorage.getItem('token');
  modifiedCheckList: any = [];
  today = new Date();
  tomorrow = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 1)

  ngOnInit() {
    this.getGrid();
    this.reminderList();
  }
  new(event) {
    this.addnotes.emit({})
  }

  openDialog(x): void {
    const dialogRef = this.dialog.open(UpdatenotesComponent, {
      data: x
    });



    dialogRef.afterClosed().subscribe(result => {
      this.addnotes.emit()

    });
  }

  removeLabel(labelId, noteId) {

    this.httpservice.
      postarchive('notes/' + noteId + '/addLabelToNotes/' + labelId + '/remove',
        {
          "noteId": noteId,
          "lableId": labelId
        }, this.token).subscribe(result => {
          // console.log(result);
          this.addnotes.emit({})
        }, error => {

          // console.log(error);
        })
  }

  goToLabel(items) {
    let label = items.label;
    this.router.navigate(['homepage/labelslist/' + label]);
  }

  getGrid() {
    this.dataService.currentGridEvent.subscribe(message => {
      this.toggle = message;
    })
  }

  reminderList() {

    this.httpservice.gettrash('notes/getReminderNotesList', this.token).subscribe(
      (data) => {
        // console.log("GET Request is successful ", data);
        LoggerService.log("GET Request is successful ", data)
      },
      error => {
        LoggerService.error("Error ", error)
      });
  }

  removeReminder(id) {
    this.httpservice.postarchive('notes/removeReminderNotes',
      {
        "noteIdList": [id]
      }
      , this.token).subscribe(
        (data) => {
          this.addnotes.emit({})
          LoggerService.log("POST Request is successful ", data)
        },
        error => {
          LoggerService.error("Error ", error)
        })
  }


  remiderCutOff(cuttOff) {
    var currentReminderTime = new Date().getTime();
    var timeValue = new Date(cuttOff).getTime();
    if (timeValue > currentReminderTime) {
      return true;
    }
    else {
      return false;
    }
  }

  updateChecklist(id) {
    var apiData = {
      "itemName": this.modifiedCheckList.itemName,
      "status": this.modifiedCheckList.status
    }
    var url = "notes/" + id + "/checklist/" + this.modifiedCheckList.id + "/update";
    this.httpservice.postarchive(url, JSON.stringify(apiData), this.token).subscribe(response => {


    })


  }

  checkBox(checkList, note) {

    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    LoggerService.log(checkList);
    this.modifiedCheckList = checkList;
    this.updateChecklist(note.id);
  }



}