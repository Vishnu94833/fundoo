import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';



@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit {

  public open: boolean = true;
  private token = localStorage.getItem('token');
  private id = localStorage.getItem('userId');
  private search: any;
  private arr: any;
  constructor( public snackBar: MatSnackBar,
                private notesService:NotesService) { }
  @Input() carddel;
  @Output() deleteevent = new EventEmitter();
  @Output() labelList = new EventEmitter();



  ngOnInit() {
    this.notesService.getLabels().subscribe(
      (data) => {
        LoggerService.log("Get Request is successful ", data);
        this.arr = data['data'].details;
      },
      error => {
        LoggerService.error("Error", error);
      });
  }

  function() {
    this.open = !this.open;
  }
  close() {
    this.open = !this.open;
  }
  delete() {

    this.notesService.deleteNote(
      {
        "isDeleted": true,
        "noteIdList": [this.carddel.id]
      }).subscribe(
        (data) => {
          LoggerService.log("POST Request is successful ", data);
          this.snackBar.open("Note Deleted Successfully", "", {
            duration: 2000
          })
          this.deleteevent.emit({
          })
        },
        error => {
          LoggerService.log("Error", error);
        }
      )

  }

/**
 * @description function to add labels to notes 
 * @param labelId 
 */
  addChips(labelId) {
    this.labelList.emit(labelId);

    this.notesService.addLabelToNotes(this.carddel.id,labelId.id,{
      "noteId": this.carddel.id,
      "lableId": labelId.id
    }).subscribe(result => {
      LoggerService.log("successfully added labels to notes.....",result);
      this.deleteevent.emit({});
    }, error => {
    })
  }
}

