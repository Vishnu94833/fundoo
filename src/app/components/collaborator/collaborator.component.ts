import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddcollaboratorComponent } from '../addcollaborator/addcollaborator.component';
import { AddnotesComponent } from '../addnotes/addnotes.component';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  @Input() collaborator;
  @Output() collaboratorEvent = new EventEmitter();
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }


  openCollaboratorDialog(): void {
    const dialogRef = this.dialog.open(AddcollaboratorComponent, {
      width: '600px',
      data: this.collaborator
    });

    dialogRef.afterClosed().subscribe(result => {
      this.collaboratorEvent.emit();
      console.log('The dialog was closed');
      
    });
  }

}
