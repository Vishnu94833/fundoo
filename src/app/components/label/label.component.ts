import { Component, OnInit, Inject, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {



  token = localStorage.getItem('token');
  label = localStorage.getItem('label')

  constructor(private httpservice: HttpService, public dialogRef: MatDialogRef<LabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  @ViewChild('Label') Label: ElementRef;
  @ViewChild('Label1') Label1: ElementRef;
  @ViewChild('myLabel') myLabel: ElementRef;


  @Output() labelList = new EventEmitter();
  ngOnInit() {
    this.labelsList();
  }
  array: any = {};
  temp: any = {};
  model: any = {};
  hoverItem: string;
  labelName: string;
  changeText: string;
  show;
  res: string;
  // value1:[];
  id = localStorage.getItem('userId');
  addLabel() {
    // console.log(this.id);

    var Label = this.Label.nativeElement.innerHTML;
    // console.log(Label);
    for (var i = 0; i < this.temp.length; i++) {
      if (this.temp[i].label == Label) {
        // console.log(this.temp[i]);
        alert('duplicate data');
        return false;
      }
    }
    this.httpservice.postarchive('noteLabels',
      {
        "label": document.getElementById('Label').innerHTML,
        "isDeleted": false,
        "userId": this.id
      }, this.token).subscribe(
        (data) => {
          // console.log("POST Request is successful ", data);
          localStorage.setItem("label", data['label']);
          localStorage.getItem('label')

        },
        error => {
          // console.log("Error", error);
        })
  }

  list(event) {
    this.labelList.emit({})
  }

  deleteLabel(id) {

    this.httpservice.labelDelete('noteLabels/' + id + '/deleteNoteLabel',
      {
        "label": document.getElementById('label').innerHTML

      }).subscribe(
        (data) => {
          // console.log("DELETE Request is successful ", data);
          this.labelList.emit({});
          // console.log(this.labelList)

        },
        error => {
          // console.log("Error", error);
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
          // console.log("UPDATE Request is successful ", data);
          // console.log(data);

        },
        error => {
          // console.log("Error", error);
        })

  }
  edit(id) {
    this.show = id;
  }


  labelsList() {
    this.httpservice.getLabels('noteLabels/getNoteLabelList', this.token).subscribe(
      (data) => {
        // console.log("Get Request is successful ", data);
        this.temp = data['data'].details;
        // console.log(data['data'].details)
      },
      error => {
        // console.log("Error", error);
      });
  }



}
