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

  constructor(private userService: UserService,private notesService: NotesService, public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddcollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  firstName = localStorage.getItem('firstname')
  lastName = localStorage.getItem('lastname');
  email = localStorage.getItem('email')
  image = localStorage.getItem('imageUrl');
  id=localStorage.getItem('id')
  img = environment.apiUrl + this.image;
  searchValue: any;
  model: any = {};
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
private searchArray:any=[];
  searchUsers() {
    this.userService.searchUserList(
      {
        "searchWord": this.model.searchValue
      }).subscribe(result => {
        this.searchArray=result['data']['details'];
        console.log("search is successful", result)
      }, error => {
        console.log(error)
      })
  }
  addCollaborators(id) {
    this.notesService.addCollaboratorsNotes(id,
      
        {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        userId: this.id
      }
      ).subscribe(result => {
    console.log("add collaborator is successful", result)
      }, error => {
  console.log(error)
})
  }
}
