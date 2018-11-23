import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DialogData, UpdatenotesComponent } from '../updatenotes/updatenotes.component';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/core/services/user/user.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';

@Component({
  selector: 'app-addcollaborator',
  templateUrl: './addcollaborator.component.html',
  styleUrls: ['./addcollaborator.component.scss']
})
export class AddcollaboratorComponent implements OnInit {

  constructor(private userService: UserService, private notesService: NotesService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddcollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    for(let i=0 ;i<this.data['collaborators'].length;i++){
      this.searchArray.push(this.data['collaborators'][i]);
      }
  }

  private firstName = localStorage.getItem('firstname')
  private lastName = localStorage.getItem('lastname');
  private email = localStorage.getItem('email')
  private image = localStorage.getItem('imageUrl');
  private id = localStorage.getItem('id')
  private img = environment.apiUrl + this.image;
  private searchValue: any;
  private model: any = {};
  private searchArray: any = [];
  

  /**
   * @description opens dialog box of add-collaborator
   */
  onNoClick(): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(UpdatenotesComponent, {
      // width: '600px',
      data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /**
   * @description Function to search user's and collaborate
   */
  searchUsers() {
    this.userService.searchUserList(
      {
        "searchWord": this.model.searchValue
      }).subscribe(result => {
        this.searchArray = result['data']['details'];
        console.log("search is successful", result)
      }, error => {
        console.log(error)
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
      console.log("add collaborator is successful", result)
    }, error => {
      console.log(error)
      console.log(this.data.id)
    })
  }
}
