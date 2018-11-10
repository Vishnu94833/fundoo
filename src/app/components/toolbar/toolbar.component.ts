import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../updatenotes/updatenotes.component';
import { HttpService } from '../../core/services/http/http.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoggerService } from '../../core/services/logger/logger.service';
import { TrashdeleteComponent } from '../trashdelete/trashdelete.component';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private httpservice: HttpService, public dialogRef: MatDialogRef<ToolbarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog) { }

  ngOnInit() {
  }


  openDialog(notes): void {
    const dialogRef = this.dialog.open(TrashdeleteComponent, {
      width: 'fit-content',
      height: 'fit-content',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.httpservice.postarchive('notes/deleteForeverNotes',
      {
        "isDeleted": false,
        "noteIdList": [notes]

      }, this.token).subscribe(
        (data) => {
          this.getTrashList();

          LoggerService.log("POST Request is successful ", data)

        },
        error => {

        }
      )

      }
      // this.getTrashList();
    });
  }


  array: any = [];
  token = localStorage.getItem('token');

  deleteforever(notes) {

    this.openDialog(notes);

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


}
