import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoggerService } from '../../core/services/logger/logger.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';

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

  private token = localStorage.getItem('token');
  private modifiedCheckList: any = [];
  private tempArray: any = [];
  private newList: any;
  private newData: any;
  private checklist = false;

  constructor(
    public dialogRef: MatDialogRef<UpdatenotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private notesService: NotesService) { }

  @Output() updateEmit = new EventEmitter();

  onNoClick(): void {
    if (this.checklist == false) {
      this.notesService.updateNotes(
        {
          'noteId': [this.data.id],
          'title': document.getElementById('title1').innerHTML,
          'description': document.getElementById('description1').innerHTML

        }).subscribe(
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
      this.notesService.updateCheckList(this.data['id'], this.modifiedCheckList.id, JSON.stringify(apiData)).subscribe(response => {
      })


    }
    error => {
      this.dialogRef.close();
    }
    this.dialogRef.close();

  }



  editing(editedList, event) {

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
    this.removedList = checklist;
    this.removeCheckList()
  }

  /**
   * @description function to remove checklist from update note dialog box
   */
  removeCheckList() {
    this.notesService.removeChecklist(this.data['id'], this.removedList.id).subscribe((response) => {
      for (var i = 0; i < this.tempArray.length; i++) {
        if (this.tempArray[i].id == this.removedList.id) {
          this.tempArray.splice(i, 1)
        }
      }
    })
  }
  private adding = false;
  private addCheck = false;
  private status = "open"

  addCheckList(event) {
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
      this.notesService.addCheckList(this.data['id'], this.newData)
        .subscribe(response => {
          LoggerService.log("", response);
          this.newList = null;
          this.addCheck = false;
          this.adding = false;
          this.tempArray.push(response['data'].details)
        })
    }
  }

  removeLabel(noteId, labelId) {

    this.notesService.removeLabelsFromNotes(noteId, labelId,
      {
        "noteId": this.data.id,
        "lableId": labelId
      }).subscribe(result => {
        LoggerService.log("", result);
      }, error => {

        LoggerService.error(error);
      })
  }


  ngOnInit() {
    if (this.data['noteCheckLists'].length > 0) {
      this.checklist = true;
    }
    this.tempArray = this.data['noteCheckLists']
  }

}
