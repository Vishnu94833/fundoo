import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-addnotes',
  templateUrl: './addnotes.component.html',
  styleUrls: ['./addnotes.component.scss']
})
export class AddnotesComponent implements OnInit {
  token = localStorage.getItem('token');
  @Output() message = new EventEmitter();
  public open: boolean = true;
  open1 = 0;
  checkArray = [];
  color: any;
  name = [];
  rollId = [];
  boxClicked = true;
  constructor(private httpservice: HttpService) { }

  ngOnInit() {

  }

  function() {
    this.open = !this.open;
  }
  functionCheckbox() {
    this.open1 = 1;
  }

  exit() {
    // this.open = this.open;
    this.httpservice.addnotes('notes/addNotes',
      {
        'title': document.getElementById('title').innerHTML,
        'description': document.getElementById('description').innerHTML,
        'labelIdList': JSON.stringify(this.rollId),
        'checklist': '',
        'isPined': 'false',
        'color': this.color
      }, this.token).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
          this.name = null;
          this.message.emit({});
          this.open = !this.open;
          this.color = "#fafafa";
          this.open1 = 0;
          console.log();
        },
        error => {
          console.log("Error", error);
          this.name = null;
          this.open = !this.open;
          this.color = "#fafafa"
          this.open1 = 0;
        })
  }

  colour(event) {
    console.log(event);
    this.color = event;
  }

  onKeydown(event) {
    if (event.key === "Enter" || event.key === "letters") {
      console.log(event);
    }
  }
  labelList(event) {
    if (this.name.indexOf(event) < 0) {
      this.rollId.push(event.id);
      this.name.push(event);
      console.log(this.rollId);
      console.log(this.name);
    }

    else {
      this.rollId.splice(this.rollId.indexOf(event), 1)
      this.name.splice(this.name.indexOf(event), 1)

    }
  }
  expression = true;
  finish(){
    if(!this.expression){
      this.expression = !this.expression;
    }

    this.boxClicked = true;
  }

  public i = 0;
  data;
  dataarray = [];
  enter() {
    this.i++;
    if (this.data != null) {
      console.log(event, "keydown");
      var obj = {
        "index": this.i,
        "data": this.data
      }
      this.dataarray.push(obj);
      this.data = null

    }
  }
  ondelete(deletedObj) {
    console.log("ondelete function runnig");
    for (var i = 0; i < this.dataarray.length; i++) {
      if (deletedObj.index == this.dataarray[i].index) {
        this.dataarray.splice(i, 1);
        break;
      }
    }
    console.log(this.dataarray);
  }

  editing(event, edited) {

    if (event.code == "Enter") {
      console.log("enter pressed");
      for (var i = 0; i < this.dataarray.length; i++) {
        if (edited.index == this.dataarray[i].index) {
          this.dataarray[i].data == edited.data
        }
      }
      console.log(this.dataarray);

    }
  }




}
