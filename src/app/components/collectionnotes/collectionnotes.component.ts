import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { EventEmitter } from 'protractor';
import { MatDialog } from '@angular/material';
import { UpdatenotesComponent } from '../updatenotes/updatenotes.component';
import { HttpService } from '../../services/http.service';
import { SearchsharingService } from '../../services/searchsharing.service';


@Component({
  selector: 'app-collectionnotes',
  templateUrl: './collectionnotes.component.html',
  styleUrls: ['./collectionnotes.component.scss']
})
export class CollectionnotesComponent implements OnInit {





  constructor(public dialog: MatDialog, private httpservice: HttpService,
    private data: SearchsharingService) { }

  @Input() cardadded;
  @Input() inputData;
  @Input() notesOption;
  @Output() addnotes = new EventEmitter();
  toggle = false;
  token = localStorage.getItem('token');

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
  getGrid() {
    this.data.currentGridEvent.subscribe(message => {
      this.toggle = message;
    })
  }

  reminderList() {
    
    this.httpservice.gettrash('notes/getReminderNotesList', this.token).subscribe(
      (data) => { 
        console.log("GET Request is successful ", data);
      },
      error => {
        console.log("Error", error);
      });
  }
}
