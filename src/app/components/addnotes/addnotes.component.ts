import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';

@Component({
  selector: 'app-addnotes',
  templateUrl: './addnotes.component.html',
  styleUrls: ['./addnotes.component.scss']
})


export class AddnotesComponent implements OnInit {


  token = localStorage.getItem('token');
  @Output() message = new EventEmitter();
  private open = true;
  private open1 = 0;
  private checkArray = [];
  private color: any = "#fafafa";
  private name = [];
  private rollId = [];
  private boxClicked = true;
  private checked = false;
  private status = "open";
  private dataArrayCheck = [];
  private date;
  private dateChip;
  private dateArray = [];
  private index = { 'id': '' }
  private today = new Date();
  private nextDay = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 1)
  constructor(private httpservice: HttpService) { }

  ngOnInit() {
    console.log(this.dateArray)
  }

  /**
   * @description Function to open take a note
   */
  function() {
    this.open = !this.open;
  }

  /**
 * @description Function to open checklist
 */
  functionCheckbox() {
    this.open1 = 1;
  }

  /**
 * @description Function to delete label in take a note
 */
  cancelLabel() {
    this.name = [];
    this.rollId = [];
  }

  /**
 * @description Function to delete reminder in take note
 */
  cancelReminder() {
    this.date = '';
    this.dateArray = [];
  }


  /**
   * @description Function to save note by post api
   */
  exit() {
    this.dateChip = '';
    if (this.date != undefined) {
      this.dateChip = this.date;
    }
    if (this.open1 == 0) {
      this.httpservice.addnotes('notes/addNotes',
        {
          'title': document.getElementById('title').innerHTML,
          'description': document.getElementById('description').innerHTML,
          'labelIdList': JSON.stringify(this.rollId),
          'checklist': '',
          'isPined': 'false',
          'color': this.color,
          'reminder': this.dateChip
        }, this.token).subscribe(
          (data) => {
            console.log("POST Request is successful ", data);

            this.name = [];
            console.log(this.dateArray);
            this.open = !this.open;
            this.color = "#fafafa";
            this.open1 = 0;
            this.dateChip = '';
            this.dateArray = [];
            this.rollId = [];
            this.date = '';
            this.message.emit({});
            console.log(this.dateArray);

          },
          error => {
            console.log("Error", error);
            // this.message.emit({});
            this.name = [];
            console.log(this.dateArray);
            this.open = !this.open;
            this.color = "#fafafa";
            this.open1 = 0;
            this.dateChip = '';
            this.dateArray = [];
            this.rollId = [];
            this.date = '';

          })
    }

    /**
   * @description Function to open take checklist
   */
    else {
      for (var i = 0; i < this.dataarray.length; i++) {
        if (this.dataarray[i].isChecked == true) {
          this.status = "close"
        }
        var apiObj = {
          "itemName": this.dataarray[i].data,
          "status": this.status
        }
        this.dataArrayCheck.push(apiObj)
        this.status = "open"
      }
      console.log(this.dataArrayCheck);
      this.httpservice.addnotes('notes/addNotes',
        {
          'title': document.getElementById('title').innerHTML,
          'labelIdList': JSON.stringify(this.rollId),
          'checklist': JSON.stringify(this.dataArrayCheck),
          'isPined': 'false',
          'color': this.color,
          'reminder': this.dateChip
        }, this.token).subscribe(
          (data) => {
            console.log("POST Request is successful ", data);
            this.message.emit({});
            this.name = [];
            console.log(this.dateArray);
            this.open = !this.open;
            this.color = "#fafafa";
            this.open1 = 0;
            this.dateChip = '';
            this.dateArray = [];
            this.dataarray = [];
            this.rollId = [];
            this.date = '';

          },
          error => {
            console.log("Error", error);
            // this.message.emit({});
            this.name = [];
            console.log(this.dateArray);
            this.open = !this.open;
            this.color = "#fafafa";
            this.open1 = 0;
            this.dateChip = '';
            this.dateArray = [];
            this.rollId = [];
            this.date = '';

          })

    }
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

  /**
   * @description Event emitter for labels list
   */
  labelList(event) {
    if (this.name.indexOf(event) < 0) {
      this.rollId.push(event.id);
      this.name.push(event);
    }
    else {
      this.rollId.splice(this.rollId.indexOf(event), 1)
      this.name.splice(this.name.indexOf(event), 1)

    }
  }


  private expression = true;
  finish() {
    if (!this.expression) {
      this.expression = !this.expression;
    }

    this.boxClicked = true;
  }

  public i = 0;
  private data;
  private dataarray = [];
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

    if (event.code == ("Enter")) {
      console.log("enter pressed");
      for (var i = 0; i < this.dataarray.length; i++) {
        if (edited.index == this.dataarray[i].index) {
          this.dataarray[i].data == edited.data
        }
      }
      console.log(this.dataarray);

    }
  }

  /**
     * @description Pin and Unpin function
     */


  pinned(id) {
    this.httpservice.addnotes('notes/pinUnpinNotes',
      {
        "isPined": true,
        "noteId": id
      }, this.token).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);

        },
        error => {
          console.log("Error", error);

        })
  }

  emitted(event) {
    this.date = event;
    this.dateArray.push(this.date);
  }



}