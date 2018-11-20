import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../updatenotes/updatenotes.component';
import { HttpService } from '../../core/services/http/http.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoggerService } from '../../core/services/logger/logger.service';
import { TrashdeleteComponent } from '../trashdelete/trashdelete.component';
import { NotesService } from 'src/app/core/services/notes/notes.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private httpservice: HttpService, public dialogRef: MatDialogRef<ToolbarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog,
    private notesService: NotesService) { }

  ngOnInit() {
  }


  openDialog(notes): void {
    const dialogRef = this.dialog.open(TrashdeleteComponent, {
      width: '200px',
      height: '50px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.notesService.deleteForeverNotes(
          {
            "isDeleted": false,
            "noteIdList": [notes]
          }).subscribe(
            (data) => {
              this.getTrashList();
              LoggerService.log("POST Request is successful ", data)
            },
            error => {
            }
          )
      }
    });
  }


  array: any = [];
  token = localStorage.getItem('token');

  deleteforever(notes) {

    this.openDialog(notes);

  }

  restoreNotes(notes) {
    this.notesService.deleteNote(
      {
        "isDeleted": false,
        "noteIdList": [notes]
      }).subscribe(
        (data) => {
          LoggerService.log("POST Request is successful ", data);
          this.getTrashList();
        },
        error => {
          LoggerService.error("Error", error);
        }
      )

  }

  getTrashList() {
    this.notesService.trashNotesList().subscribe(
      (data) => {
        LoggerService.log("GET Request is successful ", data);
        for (var i = 0; i < data['data']['data'].length; i++) {
          if (data['data']['data'][i].isDeleted == true) {
            this.array = (data['data']['data']);
          }
        }
      },
      error => {
        LoggerService.error("Error", error);
      });
  }


}
