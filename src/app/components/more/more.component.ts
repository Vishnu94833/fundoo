import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
// import { EventEmitter } from 'events';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent implements OnInit {

  public open: boolean = true;
  token = localStorage.getItem('token');
  id = localStorage.getItem('userId');
  search: any;
  arr: any;
  constructor(private httpservice: HttpService) { }
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
        console.log("Error", error);
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
          console.log("POST Request is successful ", data);

          this.deleteevent.emit({
          })
        },
        error => {
          console.log("Error", error);
        }
      )

  }


  addChips(labelId) {

    this.httpservice.postarchive('notes/' + this.carddel.id + '/addLabelToNotes/' + labelId + '/add', {
      "noteId": this.carddel.id,
      "lableId": labelId
    }, this.token).subscribe(result => {
      console.log(result);
      this.deleteevent.emit({});
    }, error => {
      console.log(this.arr.id)
      console.log(error);
    })
  }

  removeLabel(labelId) {

    this.httpservice.postarchive('notes/' + this.carddel.id + '/addLabelToNotes/' + labelId + '/remove',
      {
        "noteId": this.arr.id,
        "lableId": labelId
      }, this.token).subscribe(result => {
        console.log(result);
        this.deleteevent.emit({});
      }, error => {

        console.log(error);
      })
  }

}

