import { Component, OnInit, Inject, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {



  token = localStorage.getItem('token');
  label = localStorage.getItem('label')

  constructor(private httpservice: HttpService, public dialogRef: MatDialogRef<LabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  @ViewChild('myLabel') myLabel: ElementRef;
  @ViewChild('Label1') Label1: ElementRef;

  @Output() labelList = new EventEmitter();
  ngOnInit() {

  }
  array: any = {};
  temp: any = {};
  model: any = {};
  hoverItem: string;
  labelName: string;
  changeText: string;
  temp1: any = {};
  temp2: any = {};
  show;
  res: string;
  id = localStorage.getItem('userId');
  // addLabel() {
  //   console.log(this.id);
  //   this.httpservice.postarchive('noteLabels',
  //     {
  //       "label": document.getElementById('Label').innerHTML,
  //       "isDeleted": false,
  //       "userId": this.id
  //     }, this.token).subscribe(
  //       (data) => {
  //         console.log("POST Request is successful ", data);
  //         localStorage.setItem("label", data['label']);
  //         localStorage.getItem('label')

  //       },
  //       error => {
  //         console.log("Error", error);
  //       })
  // }

  list(event) {
    this.labelList.emit({})
  }

  deleteLabel(id) {

    this.httpservice.labelDelete('noteLabels/' + id + '/deleteNoteLabel',
      {
        "label": document.getElementById('label').innerHTML

      }).subscribe(
        (data) => {
          console.log("DELETE Request is successful ", data);
          this.labelList.emit({});
          console.log(this.labelList)

        },
        error => {
          console.log("Error", error);
        })
  }


  editLabel(id) {
    console.log(this.id);
    this.httpservice.postarchive('noteLabels/' + id + '/updateNoteLabel',
      {
        "label": this.myLabel.nativeElement.innerHTML,
        "isDeleted": false,
        "userId": this.id,
        "id": id
      }
      , this.token).subscribe(
        (data) => {
          console.log("UPDATE Request is successful ", data);
          // this.temp2 = data['data']['details'];

          console.log(data);

        },
        error => {
          console.log("Error", error);
        })

  }
  edit(id) {
    this.show = id;
  }


}
