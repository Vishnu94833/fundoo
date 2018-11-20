import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotesService } from 'src/app/core/services/notes/notes.service';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss']
})
export class ArchivesComponent implements OnInit {
  private token = localStorage.getItem('token');
  
  constructor(private notesService: NotesService) { }
  
  @Input() archive;
  @Output() archiveEvent = new EventEmitter();
  ngOnInit() {
  }

  archives() {
    this.notesService.archiveNotes(
      {
        "isArchived": true,
        "noteIdList": [this.archive.id]
      }).subscribe(
        (data) => {
          this.archiveEvent.emit({});
        },
        error => {
        })
  }

   unArchive() {
    this.notesService.archiveNotes(
      {
        "isArchived": false,
        "noteIdList": [this.archive.id]
      }).subscribe(
        (data) => {
          this.archiveEvent.emit({});
        },
        error => {
        })
  }
}
