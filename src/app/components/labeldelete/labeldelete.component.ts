import { Component, OnInit,Inject } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogData } from '../updatenotes/updatenotes.component';

@Component({
  selector: 'app-labeldelete',
  templateUrl: './labeldelete.component.html',
  styleUrls: ['./labeldelete.component.scss']
})
export class LabeldeleteComponent implements OnInit {

  constructor(private httpservice: HttpService, public dialogRef: MatDialogRef<LabeldeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }


}
