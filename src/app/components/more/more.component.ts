import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
// import { TrashComponent } from '../trash/trash.component';
// import { CollectionnotesComponent } from '../collectionnotes/collectionnotes.component';
import { MatSnackBar } from '@angular/material';
// import { EventEmitter } from 'events';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit {

  public open: boolean = true;
  private token = localStorage.getItem('token');
  private id = localStorage.getItem('userId');
  private search: any;
  private arr: any;
  constructor(private httpservice: HttpService, public snackBar: MatSnackBar) { }
  @Input() carddel;
  @Output() deleteevent = new EventEmitter();
  @Output() labelList = new EventEmitter();



  ngOnInit() {
    this.httpservice.getLabels('noteLabels/getNoteLabelList', this.token).subscribe(
      (data) => {
        // console.log("Get Request is successful ", data);
        this.arr = data['data'].details;
      },
      error => {
        // console.log("Error", error);
      });
  }

  function() {
    this.open = !this.open;
  }
  close() {
    this.open = !this.open;
  }
  delete() {

    this.httpservice.postarchive('notes/trashNotes',
      {
        "isDeleted": true,
        "noteIdList": [this.carddel.id]
      }, this.token).subscribe(
        (data) => {
          // console.log("POST Request is successful ", data);
          this.snackBar.open("Note Deleted Successfully", "", {
            duration: 2000
          })

          this.deleteevent.emit({
          })
        },
        error => {
          // console.log("Error", error);
        }
      )

  }


  addChips(labelId) {
    // console.log(labelId.label)
    this.labelList.emit(labelId);

    this.httpservice.postarchive('notes/' + this.carddel.id + '/addLabelToNotes/' + labelId.id + '/add', {
      "noteId": this.carddel.id,
      "lableId": labelId.id
    }, this.token).subscribe(result => {
      // console.log(result);
      this.deleteevent.emit({});
    }, error => {
      // console.log(this.arr.id)
      // console.log(error);  
    })
  }

  removeLabel(labelId) {

    this.httpservice.postarchive('notes/' + this.carddel.id + '/addLabelToNotes/' + labelId + '/remove',
      {
        "noteId": this.arr.id,
        "lableId": labelId
      }, this.token).subscribe(result => {
        // console.log(result);
        this.deleteevent.emit({});
      }, error => {

        // console.log(error);
      })
  }

}

