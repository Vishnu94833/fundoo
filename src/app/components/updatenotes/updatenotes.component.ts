import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../services/http.service';
// import { EventEmitter } from 'protractor';

export interface DialogData {
  title: string;
  description: string;
  id: string;
}
@Component({
  selector: 'app-updatenotes',
  templateUrl: './updatenotes.component.html',
  styleUrls: ['./updatenotes.component.css']
})
export class UpdatenotesComponent implements OnInit {

  token = localStorage.getItem('token');


  constructor(private httpservice: HttpService,
    public dialogRef: MatDialogRef<UpdatenotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  @Output() updateEmit = new EventEmitter();

  onNoClick(): void {
    this.httpservice.addnotes('notes/updateNotes',
      {
        'noteId': [this.data.id],
        'title': document.getElementById('title1').innerHTML,
        'description': document.getElementById('description1').innerHTML

      }, this.token).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
          this.dialogRef.close();
          this.updateEmit.emit({});

          console.log();
        },
        error => {
          console.log("Error", error);
        })
    this.dialogRef.close();
  }
  removeLabel(labelId) {

    this.httpservice.postarchive('notes/' + this.data.id + '/addLabelToNotes/' + labelId + '/remove',
      {
        "noteId": this.data.id,
        "lableId": labelId
      }, this.token).subscribe(result => {
        console.log(result);
      }, error => {

        console.log(error);
      })
  }




  ngOnInit() {
  }



}
