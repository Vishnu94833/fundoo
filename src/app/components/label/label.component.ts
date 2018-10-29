import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
// import {  } from 'events';


@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {

  token = localStorage.getItem('token');
  label = localStorage.getItem('label')

  constructor(private httpservice: HttpService) { }

  @Input() labels;
  @Output() labelList = new EventEmitter();
  ngOnInit() {
    this.labelList1();
  }
  array: any = {};
  temp: any = {};
  model: any = {};
  hoverItem: string;
  labelName: string;
  changeText: string;
  temp1;

  id = localStorage.getItem('userId');
  addLabel() {
    console.log(this.id);
    this.httpservice.postarchive('noteLabels',
      {
        "label": document.getElementById('label').innerHTML,
        "isDeleted": true,
        "userId": this.id
      }, this.token).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
          console.log(data);
          localStorage.setItem("label", data['label']);
          localStorage.getItem('label')
          this.labelList.emit({})



        },
        error => {
          console.log("Error", error);
        })
  }

  list(event) {
    this.labelList.emit({})
  }

  labelList1() {


    this.httpservice.getLabels('noteLabels/getNoteLabelList', this.token).subscribe(
      (data) => {
        console.log("Get Request is successful ", data);

        // this.temp1 = data['data'].details;
            for (let index = 0; index < data['data'].details.length; index++) {
            if (data['data'].details.isDeleted===false) {
              
           
             this.temp1.push(data['data'].details[index])
           }
           }
        console.log(data['data'].details)

      },
      error => {
        console.log("Error", error);
      });


  }

  deleteLabel() {
    
    this.httpservice.labelDelete('noteLabels/{id}/deleteNoteLabel',
      {
        "label": document.getElementById('label').innerHTML
    
      }).subscribe(
        (data) => {
          console.log("DELETE Request is successful ", data);
          
        },
        error => {
          console.log("Error", error);
        })
  }



}
