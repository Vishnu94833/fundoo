import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { EventEmitter } from 'protractor';
import { MatDialog } from '@angular/material';
import { UpdatenotesComponent } from '../updatenotes/updatenotes.component';
import { HttpService } from '../../core/services/http/http.service';
import { SearchsharingService } from '../../core/services/dataservice/searchsharing.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-collectionnotes',
  templateUrl: './collectionnotes.component.html',
  styleUrls: ['./collectionnotes.component.scss']
})
export class CollectionnotesComponent implements OnInit {


  constructor(public dialog: MatDialog, private httpservice: HttpService,
    private dataService: SearchsharingService,
    private router: Router) {
    this.dataService.currentChipEvent.subscribe(
      message => {
        if (message)
          this.addnotes.emit({});
      }
    )
  }

  @Input() cardadded;
  @Input() inputData;
  @Input() notesOption;
  @Output() addnotes = new EventEmitter();
  private toggle = false;
  private token = localStorage.getItem('token');
  private modifiedCheckList: any = [];
  private today = new Date();
  private tomorrow = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 1)

  ngOnInit() {
    this.getGrid();
    this.reminderList();
  }
  new(event) {
    this.addnotes.emit({})
  }

  /**
   * @description open dialog box to update notes
   */
  openDialog(x): void {
    const dialogRef = this.dialog.open(UpdatenotesComponent, {
      data: x
    });


    /**
     * @description once dialog box is closed notes will be updated
     */
    dialogRef.afterClosed().subscribe(result => {
      this.addnotes.emit()

    });
  }

  /**
   * @description function to remove labels by hitting post api
   * @param labelId 
   * @param noteId 
   */
  removeLabel(labelId, noteId) {

    this.httpservice.
      postarchive('notes/' + noteId + '/addLabelToNotes/' + labelId + '/remove',
        {
          "noteId": noteId,
          "lableId": labelId
        }, this.token).subscribe(result => {
          // console.log(result);
          this.addnotes.emit({})
        }, error => {

          // console.log(error);
        })
  }

  /**
   * @description function to go to the respective labels by clicking on labels in card collection
   * @param items 
   */
  goToLabel(items) {
    let label = items.label;
    this.router.navigate(['homepage/labelslist/' + label]);
  }

  /**
   *@description function to view the notes collection in grid view
   */
  getGrid() {
    this.dataService.currentGridEvent.subscribe(message => {
      this.toggle = message;
    })
  }

  /**
 *@description function to get reminders list
 */
  reminderList() {

    this.httpservice.gettrash('notes/getReminderNotesList', this.token).subscribe(
      (data) => {
        // console.log("GET Request is successful ", data);
        LoggerService.log("GET Request is successful ", data)
      },
      error => {
        LoggerService.error("Error ", error)
      });
  }

  /**
   * @description function to remove reminder from notes collection
   * @param id 
   */
  removeReminder(id) {
    this.httpservice.postarchive('notes/removeReminderNotes',
      {
        "noteIdList": [id]
      }
      , this.token).subscribe(
        (data) => {
          this.addnotes.emit({})
          LoggerService.log("POST Request is successful ", data)
        },
        error => {
          LoggerService.error("Error ", error)
        })
  }


  /**
   * @description function to strike expired reminder
   * @param cuttOff 
   */
  remiderCutOff(cuttOff) {
    var currentReminderTime = new Date().getTime();
    var timeValue = new Date(cuttOff).getTime();
    if (timeValue > currentReminderTime) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * @description function to update checklist after updating
   * @param id 
   */
  updateChecklist(id) {
    var apiData = {
      "itemName": this.modifiedCheckList.itemName,
      "status": this.modifiedCheckList.status
    }
    var url = "notes/" + id + "/checklist/" + this.modifiedCheckList.id + "/update";
    this.httpservice.postarchive(url, JSON.stringify(apiData), this.token).subscribe(response => {


    })


  }

  /**
   * @description function to check and uncheck the status of check box
   * @param checkList 
   * @param note 
   */
  checkBox(checkList, note) {

    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    LoggerService.log(checkList);
    this.modifiedCheckList = checkList;
    this.updateChecklist(note.id);
  }



}