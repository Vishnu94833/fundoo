import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogData } from '../updatenotes/updatenotes.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productconfirm',
  templateUrl: './productconfirm.component.html',
  styleUrls: ['./productconfirm.component.scss']
})
export class ProductconfirmComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ProductconfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private router:Router) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  rejectCart(){
    this.dialogRef.close();
  }

  proceedCheckout(){
    this.onNoClick()
    this.router.navigate(['/signup'])
  }
}
