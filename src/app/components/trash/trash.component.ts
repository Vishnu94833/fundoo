import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { TrashdeleteComponent } from '../trashdelete/trashdelete.component';


@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  constructor(private httpservice: HttpService,public dialog: MatDialog) { }


  openDialog(x): void {
    const dialogRef = this.dialog.open(ToolbarComponent, {
      width: 'fit-content',
      height:'fit-content',
      data: x
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTrashList();
    });
  }




  openDelete(notes): void {
    const dialogRef = this.dialog.open(TrashdeleteComponent, {
      width: 'fit-content',
      height:'fit-content',
      // data: x
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==true)
      {
      this.httpservice.postarchive('notes/deleteForeverNotes',
      {
        "isDeleted": false,
        "noteIdList": [notes]

      }, this.token).subscribe(
        (data) => {
          this.getTrashList();
          // console.log("POST Request is successful ", data);

        },
        error => {
          // console.log("Error", error);
        }
      )
    }
    });
  }




  array: any = [];
  token = localStorage.getItem('token');
  ngOnInit() {

    this.getTrashList();


  }

  deleteforever(notes) {
    // console.log(notes)
    // this.httpservice.postarchive('notes/deleteForeverNotes',
    //   {
    //     "isDeleted": false,
    //     "noteIdList": [notes]

    //   }, this.token).subscribe(
    //     (data) => {
    //       this.getTrashList();

    //     },
    //     error => {
    //     }
    //   )
    this.openDelete(notes);

  }


  getTrashList() {
    this.httpservice.gettrash('notes/getTrashNotesList', this.token).subscribe(
      (data) => {
        // console.log("GET Request is successful ", data);
        for (var i = 0; i < data['data']['data'].length; i++) {
          if (data['data']['data'][i].isDeleted == true) {
            this.array = (data['data']['data']);
          }
        }
      },
      error => {
        // console.log("Error", error);
      });
  }

  restoreNotes(notes) {

    this.httpservice.postarchive('notes/trashNotes',
      {
        "isDeleted": false,
        "noteIdList": [notes]
      }, this.token).subscribe(
        (data) => {
          // console.log("POST Request is successful ", data);
          this.getTrashList();
        },
        error => {
          // console.log("Error", error);
        }
      )

  }

}
