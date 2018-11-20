import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../updatenotes/updatenotes.component';


@Component({
  selector: 'app-trashdelete',
  templateUrl: './trashdelete.component.html',
  styleUrls: ['./trashdelete.component.scss']
})
export class TrashdeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TrashdeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

}
