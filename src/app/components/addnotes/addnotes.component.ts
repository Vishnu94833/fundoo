/************************************************************************************************
*  Execution       :   1. default node         cmd> addnotes.ts 
*        
*  Purpose         : To add notes ,add checklist reminders,labels,change color 
* 
*  Description    
* 
*  @file           : addnotes.ts
*  @overview       : To display small card & hiddencards & change color when clicked
*  @module         : addnotes.ts - This is optional if expeclictly its an npm or local package
*  @author         : K VISHNU <kuppanvishnu@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
import { Component, OnInit, Output, OnDestroy, EventEmitter } from '@angular/core';
import { NotesService } from '../../core/services/notes/notes.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { AddcollaboratorComponent } from '../addcollaborator/addcollaborator.component';
import { MatDialog } from '@angular/material';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-addnotes',
  templateUrl: './addnotes.component.html',
  styleUrls: ['./addnotes.component.scss']
})


export class AddnotesComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  token = localStorage.getItem('token');
  @Output() message = new EventEmitter();
  @Output() messageModel = new EventEmitter();
  private open = true;
  private open1 = 0;
  private collaboratorIcon :any=0;
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
  private firstName = localStorage.getItem('firstname')
  private lastName = localStorage.getItem('lastname');
  private email = localStorage.getItem('email')
  private image = localStorage.getItem('imageUrl');
  private id = localStorage.getItem('id')
  private img = environment.apiUrl + this.image;

  constructor(private notesService: NotesService,private userService:UserService,public dialog: MatDialog) { }

  ngOnInit() {
  }

  openCollaboratorDialogAddNotes(): void {
    const dialogRef = this.dialog.open(AddcollaboratorComponent, {
      width: '600px',
      // data: this.collaborator
    });

    dialogRef.afterClosed().subscribe(result => {
      LoggerService.log('The dialog was closed');
      
    });
  }

  /**
   * @description Function to open take a note
   */
  function() {
    this.open = !this.open;
  }

    /**
   * @description Function to open take a note
   */
  functionCollaborator() {
    this.collaboratorIcon = 1;
  }
  functionCollaboratorClose(){
    this.collaboratorIcon = 0;
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

      this.notesService.addnotes(
        {
          'title': document.getElementById('title').innerHTML,
          'description': document.getElementById('description').innerHTML,
          'labelIdList': JSON.stringify(this.rollId),
          'checklist': '',
          'isPined': 'false',
          'color': this.color,
          'reminder': this.dateChip,
          'collaberators':JSON.stringify(this.collaborator)
        }
      )
      .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            LoggerService.log("POST Request is successful ", data);
            this.name = [];
            this.open = !this.open;
            this.color = "#fafafa";
            this.open1 = 0;
            this.dateChip = '';
            this.dateArray = [];
            this.rollId = [];
            this.date = '';
            this.messageModel.emit(data['status'].details);
          },
          error => {
            LoggerService.error("Error", error);
            this.name = [];
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
      this.notesService.addnotes(
        {
          'title': document.getElementById('title').innerHTML,
          'labelIdList': JSON.stringify(this.rollId),
          'checklist': JSON.stringify(this.dataArrayCheck),
          'isPined': 'false',
          'color': this.color,
          'reminder': this.dateChip
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            this.messageModel.emit(data['status'].details);
            this.name = [];
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
            this.name = [];
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
    this.color = event;
  }

  onKeydown(event) {
    if (event.key === "Enter" || event.key === "letters") {
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
      var obj = {
        "index": this.i,
        "data": this.data
      }
      this.dataarray.push(obj);
      this.data = null

    }
  }
  ondelete(deletedObj) {
    for (var i = 0; i < this.dataarray.length; i++) {
      if (deletedObj.index == this.dataarray[i].index) {
        this.dataarray.splice(i, 1);
        break;
      }
    }
  }

  editing(event, renamed) {

    if (event.code == ("Enter")) {
      for (var i = 0; i < this.dataarray.length; i++) {
        if (renamed.index == this.dataarray[i].index) {
          this.dataarray[i].data == renamed.data;
        }
      }
    }
  }

  emitted(event) {
    this.date = event;
    this.dateArray.push(this.date);
  }
  private searchValue: any;
  // private model: any = {};
  private searchArray: any = [];
  private collaborator: any = [];
  private newList:any=[];
  /**
   * @description Function to search user's and collaborate
   */
  searchUsers() {
    this.userService.searchUserList(
      {
        "searchWord": this.searchValue
      }).subscribe(result => {
        this.searchArray = result['data']['details'];
        LoggerService.log("search is successful", result)
      }, error => {
        LoggerService.error(error)
      })
  }

  /**
   * @description function to add collaborator
   * @param id 
   */
  // addCollaborators(searchItems) {
  //   this.notesService.addCollaboratorsNotes(this.id,

  //     {
  //       "email": searchItems.email,
  //       "firstName": searchItems.firstName,
  //       "lastName": searchItems.lastName,
  //       "userId": searchItems.userId
  //     }
  //   ).subscribe(result => {
  //     LoggerService.log("add collaborator is successful", result)
  //   }, error => {
  //     console.log(error)
  //   })
  // }

  removeCollaborators(searchItems){
    this.notesService.removeCollaboratorNotes(this.id,searchItems.userId).subscribe(result=>{
      console.log("collaborator removed successfully",result);
    })
  }


  enterNewUser(user)
  {
    for(let i = 0; i < this.searchArray.length; i++)
    {
      if(this.searchArray[i].email == user)
      {
        this.collaborator.push(this.searchArray[i]);
      }
    }
  }

  select(mail){
    this.searchValue = mail;
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}