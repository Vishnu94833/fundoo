import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddcollaboratorComponent } from '../addcollaborator/addcollaborator.component';
@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }



  openCollaboratorDialog(): void {
    const dialogRef = this.dialog.open(AddcollaboratorComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

}
