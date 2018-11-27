/************************************************************************************************
*  Execution       :   1. default node         cmd> addcollaborator.ts 
*        
*  Purpose         : To share notes with different user 
* 
*  Description    
* 
*  @file           : addcollaborator.ts
*  @overview       : To display small card & hiddencards & change color when clicked
*  @module         : notes.ts - This is optional if expeclictly its an npm or local package
*  @author         : K VISHNU <kuppanvishnu@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { DialogData, UpdatenotesComponent } from '../updatenotes/updatenotes.component';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/core/services/user/user.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';

@Component({
  selector: 'app-addcollaborator',
  templateUrl: './addcollaborator.component.html',
  styleUrls: ['./addcollaborator.component.scss']
})
export class AddcollaboratorComponent implements OnInit {

  constructor(private userService: UserService, private notesService: NotesService,
    public dialog: MatDialog, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddcollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    for (let i = 0; i < this.data['collaborators'].length; i++) {
      this.collaborator.push(this.data['collaborators'][i]);
      console.log(this.data['collaborators']['id'])
    }
  }

  private firstName = localStorage.getItem('firstname')
  private lastName = localStorage.getItem('lastname');
  private email = localStorage.getItem('email')
  private image = localStorage.getItem('imageUrl');
  private id = localStorage.getItem('id')
  private owner = this.data['user'];
  private collabPic = environment.baseUrl + this.owner.imageUrl;
  private img = environment.apiUrl + this.image;
  private searchValue: any;
  // private model: any = {};
  private searchArray: any = [];
  private collaborator: any = [];
  private newList: any = [];
  /**
   * @description opens dialog box of add-collaborator
   */
  onNoClick(): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(UpdatenotesComponent, {
      width: '600px',
      data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {
      LoggerService.log('The dialog was closed');
    });
  }

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
  addCollaborators(searchItems) {
    this.notesService.addCollaboratorsNotes(this.data.id,

      {
        "email": searchItems.email,
        "firstName": searchItems.firstName,
        "lastName": searchItems.lastName,
        "userId": searchItems.userId
      }
    ).subscribe(result => {
      LoggerService.log("add collaborator is successful", result)
    }, error => {
      LoggerService.error(error)
    })
  }

  select(mail) {
    this.searchValue = mail;
  }

  removeCollaborators(searchItems) {
    this.notesService.removeCollaboratorNotes(this.data.id, searchItems.userId)
      .subscribe(result => {
        console.log(searchItems)
        LoggerService.log("collaborator removed successfully", result);
        for (let i = 0; i < this.collaborator.length; i++) {
          if (searchItems.email == this.collaborator[i].email) {
            this.collaborator.splice(i, 1);
          }
        }
      })
  }


  enterNewUser(user) {

    for (let k = 0; k < this.collaborator.length; k++) {
      if (this.searchValue == this.collaborator[k].email) {
        this.snackBar.open("Collaborator already exists", "", {
          duration: 2000
        })
        this.searchValue = null;
        return false;
      }
    }
    for (let i = 0; i < this.searchArray.length; i++) {
      if (this.searchArray[i].email == user) {
        this.collaborator.push(this.searchArray[i]);
      }
    }
  }
}