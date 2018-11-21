import { Component, OnInit,OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { TrashdeleteComponent } from '../trashdelete/trashdelete.component';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'


@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit , OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(public dialog: MatDialog,
    private notesService: NotesService) { }


  openDialog(x): void {
    const dialogRef = this.dialog.open(ToolbarComponent, {
      // width: 'fit-content',
      // height: 'fit-content',
      data: x
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      this.getTrashList();
    });
  }




  openDelete(notes): void {
    const dialogRef = this.dialog.open(TrashdeleteComponent, {
      width: 'fit-content',
      height: 'fit-content',
      // data: x
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      if (result == true) {
        this.notesService.deleteForeverNotes(
          {
            "isDeleted": false,
            "noteIdList": [notes]
          }).pipe(takeUntil(this.destroy$)).subscribe(
            (data) => {
              this.getTrashList();
              LoggerService.log("POST Request is successful ", data);
            },
            error => {
              LoggerService.log("Error", error);
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
    this.openDelete(notes);
  }


  getTrashList() {
    this.notesService.trashNotesList().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        let myTrash = 
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



  restoreNotes(notes) {

    this.notesService.deleteNote({
      "isDeleted": false,
      "noteIdList": [notes]
    }).pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        LoggerService.log("POST Request is successful ", data);
        this.getTrashList();
      },
      error => {
        LoggerService.error("Error", error);
      }
    )

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
