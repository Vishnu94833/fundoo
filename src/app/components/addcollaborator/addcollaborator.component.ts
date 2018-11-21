import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../updatenotes/updatenotes.component';
import { NotesService } from 'src/app/core/services/notes/notes.service';

@Component({
  selector: 'app-addcollaborator',
  templateUrl: './addcollaborator.component.html',
  styleUrls: ['./addcollaborator.component.scss']
})
export class AddcollaboratorComponent implements OnInit {

  constructor( private notesService:NotesService,public dialogRef: MatDialogRef<AddcollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit() {
  }

  addCollaborator()
  {
    // this.notesService.addCollaboratorsNotes
    // (
    //   {
    //     "collaborators": [  {}  ]
    
    //   }).subscribe(
    //     (data) => {

    //     },
    //     error => {
    //     })
  }
}
