import { Component, OnInit, Input, Output, EventEmitter,OnDestroy } from '@angular/core';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss']
})
export class ArchivesComponent implements OnInit,  OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

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
      }).pipe(takeUntil(this.destroy$)).subscribe(
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
      }).pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          this.archiveEvent.emit({});
        },
        error => {
        })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
