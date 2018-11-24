/************************************************************************************************
*  Execution       :   1. default node         cmd> archive.ts 
*        
*  Purpose         : To get archived notes 
* 
*  Description    
* 
*  @file           : archive.ts
*  @overview       : To get and display archived notes
*  @module         : archive.ts - This is optional if expeclictly its an npm or local package
*  @author         : K VISHNU <kuppanvishnu@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { Notedetails } from 'src/app/core/model/notedetails';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private archivearray: any = [];
  private token = localStorage.getItem('token');
  @Output() archiveEvent = new EventEmitter();

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.getArchiveList();
  }


  getArchiveList() {

    this.archivearray = [];
    this.notesService.getArchiveNotesList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data) => {
        var myArchiveList : Notedetails[] = data['data'].data ;
        for (var i = myArchiveList.length - 1; i >= 0; i--) {
          this.archivearray.push(myArchiveList[i]);
          this.archiveEvent.emit({});
        }
      },
      error => {
      });

  }

  new(event) {

    this.getArchiveList();

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
