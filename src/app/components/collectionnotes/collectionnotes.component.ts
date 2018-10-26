import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
// import { EventEmitter } from 'protractor';
import {MatDialog} from '@angular/material';
import { UpdatenotesComponent } from '../updatenotes/updatenotes.component';


@Component({
  selector: 'app-collectionnotes',
  templateUrl: './collectionnotes.component.html',
  styleUrls: ['./collectionnotes.component.css']
})
export class CollectionnotesComponent implements OnInit {

 
  


  constructor(public dialog: MatDialog) { }
  
  @Input() cardadded;
  @Output() addnotes= new EventEmitter();
  // @Output() colorEvent=new EventEmitter();


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

  

}
