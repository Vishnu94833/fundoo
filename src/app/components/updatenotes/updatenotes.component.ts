import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service';
import { LoggerService } from '../../core/services/logger/logger.service';
// import { EventEmitter } from 'protractor';

export interface DialogData {
  title: string;
  description: string;
  id: string;
}
@Component({
  selector: 'app-updatenotes',
  templateUrl: './updatenotes.component.html',
  styleUrls: ['./updatenotes.component.scss']
})
export class UpdatenotesComponent implements OnInit {

  token = localStorage.getItem('token');
  modifiedCheckList: any = [];
  tempArray: any = [];
  public newList: any;
  public newData: any;
  public checklist=false;

  constructor(private httpservice: HttpService,
    public dialogRef: MatDialogRef<UpdatenotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  @Output() updateEmit = new EventEmitter();

  onNoClick(): void {
    if(this.checklist==false){
    this.httpservice.addnotes('notes/updateNotes',
      {
        'noteId': [this.data.id],
        'title': document.getElementById('title1').innerHTML,
        'description': document.getElementById('description1').innerHTML

      }, this.token).subscribe(
        (data) => {
          LoggerService.log("Post Request is successful ", data)
          this.dialogRef.close();
          this.updateEmit.emit({});
        },
        error => {
          LoggerService.log("Error", error)

        })
    this.dialogRef.close();
  }
  else {
      var apiData = {
        "itemName": this.modifiedCheckList.itemName,
        "status": this.modifiedCheckList.status
      }
      var url = "notes/" + this.data['id'] + "/checklist/" + this.modifiedCheckList.id + "/update";
      this.httpservice.postarchive(url, JSON.stringify(apiData), this.token).subscribe(response => {
        console.log(response);
        // this.archiveEvent.emit();

      })


    }
    error => {
      console.log(error);
    }

  }



  editing(editedList, event) {

    console.log(editedList);
    if (event.code == "Enter") {
      this.modifiedCheckList = editedList;
      this.onNoClick();
    }

  }

  checkBox(checkList) {

    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    console.log(checkList);
    this.modifiedCheckList = checkList;
    this.onNoClick();
  }

  public removedList;
  removeList(checklist) {
    console.log(checklist)
    this.removedList = checklist;
    this.removeCheckList()
  }
  removeCheckList() {
    var url = "notes/" + this.data['id'] + "/checklist/" + this.removedList.id + "/remove";

    this.httpservice.postarchive(url, null, this.token).subscribe((response) => {
      console.log(response);
      for (var i = 0; i < this.tempArray.length; i++) {
        if (this.tempArray[i].id == this.removedList.id) {
          this.tempArray.splice(i, 1)
        }
      }
    })
  }
  public adding = false;
  public addCheck = false;
  public status = "open"

  addList(event) {
    if (this.newList != "") {
      this.adding = true;
    }
    else {
      this.adding = false;
    }
    if (event.code == "Enter") {
      if (this.addCheck == true) {
        this.status = "close";
      }
      else {
        this.status = "open"
      }
      this.newData = {
        "itemName": this.newList,
        "status": this.status
      }
      var url = "notes/" + this.data['id'] + "/checklist/add";

      this.httpservice.postarchive(url, this.newData, this.token)
        .subscribe(response => {
          console.log(response);
          this.newList = null;
          this.addCheck = false;
          this.adding = false;
          console.log(response['data'].details);

          this.tempArray.push(response['data'].details)

          console.log(this.tempArray)

        })
    }
  }
  removeLabel(labelId) {

    this.httpservice.postarchive('notes/' + this.data.id + '/addLabelToNotes/' + labelId + '/remove',
      {
        "noteId": this.data.id,
        "lableId": labelId
      }, this.token).subscribe(result => {
        // console.log(result);
      }, error => {

        // console.log(error);
      })
  }




  ngOnInit() {
    if (this.data['noteCheckLists'].length>0){
      this.checklist=true;
    }
    this.tempArray=this.data['noteCheckLists']



  }



}
