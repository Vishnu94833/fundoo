import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
// import {  } from 'events';


@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {

  token = localStorage.getItem('token');
 label= localStorage.getItem('label')

  constructor(private httpservice: HttpService) { }

  @Input() labels;
  @Output() labelList=new EventEmitter();
  ngOnInit() 
  
  {
  this.labelList1();
  }
  array:any={};
  model:any = {};

labelName:string;
temp1;

  id = localStorage.getItem('userId');
  addLabel() {
    console.log(this.id);
    this.httpservice.postarchive('noteLabels',
      {
        "label": document.getElementById('label').innerHTML,
        "isDeleted": false,
        "userId": this.id
      }, this.token).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
          console.log(data);
          localStorage.setItem("label",data['label']);
          localStorage.getItem('label')
          this.labelList.emit({})

    
          
        },
        error => {
          console.log("Error", error);
        })
  }

  list(event)
  {
this.labelList.emit({})
  }

  labelList1() {


    this.httpservice.getLabels('noteLabels/getNoteLabelList', this.token).subscribe(
      (data) => {
        console.log("Get Request is successful ", data);
        
this.temp1 = data['data'].details;
        console.log(data['data'].details)

      },
      error => {
        console.log("Error", error);
      });


  }


}
