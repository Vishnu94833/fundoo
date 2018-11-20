import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {

  private token = localStorage.getItem('token');
  @Input() pinArr;
  @Output() pinEmit = new EventEmitter();

  constructor(private notesService: NotesService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  /**
   * @description Funtion to pin a note 
   */
  pinned() {
    this.notesService.pinUnpinNotes(
      {
        "isPined": true,
        "noteIdList": [this.pinArr.id]
      }).subscribe(
        (data) => {
          LoggerService.log("POST pin Request is successful ", data);
          this.snackBar.open("Note Pinned Successfully", "", {
            duration: 2000
          })
          this.pinEmit.emit();

        },
        error => {
          LoggerService.error("Error", error);

        })
  }

  /**
 * @description Funtion to Un-pin a note 
 */
  unPinned() {
    this.notesService.pinUnpinNotes(
      {
        "isPined": false,
        "noteIdList": [this.pinArr.id]
      }).subscribe(
        (data) => {
          LoggerService.log("POST unpin Request is successful ", data);
          this.snackBar.open("Note UnPinned Successfully", "", {
            duration: 2000
          })

          this.pinEmit.emit();

        },
        error => {
          LoggerService.error("Error", error);

        })
  }

}
