import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
// import { EventEmitter } from 'protractor';
import {MatDialog} from '@angular/material';
import { UpdatenotesComponent } from '../updatenotes/updatenotes.component';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-collectionnotes',
  templateUrl: './collectionnotes.component.html',
  styleUrls: ['./collectionnotes.component.css']
})
export class CollectionnotesComponent implements OnInit {

 
  


  constructor(public dialog: MatDialog,private httpservice: HttpService) { }
  
  @Input() cardadded;
  @Output() addnotes= new EventEmitter();
  token = localStorage.getItem('token');

  ngOnInit() {
     
  }
  new(event)
  {
this.addnotes.emit({})
  }

  openDialog(x): void {
    const dialogRef = this.dialog.open(UpdatenotesComponent, {
      width: '500px',
      data: x
    });

  

  dialogRef.afterClosed().subscribe(result => {
    this.addnotes.emit()

  });
}

removeLabel(labelId, noteId) {

  this.httpservice.postarchive('notes/' +noteId+ '/addLabelToNotes/' + labelId + '/remove',
    {
      "noteId": noteId,
      "lableId": labelId
    }, this.token).subscribe(result => {
      console.log(result);
    }, error => {

      console.log(error);
    })
}

}
