/************************************************************************************************
*  Execution       :   1. default node         cmd> changecolor.ts 
*        
*  Purpose         : To change color of notes
* 
*  Description    
* 
*  @file           : changecolor.ts
*  @overview       : To change color of notes
*  @module         : changecolor.ts - This is optional if expeclictly its an npm or local package
*  @author         : K VISHNU <kuppanvishnu@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
import { Component, OnInit, Input, Output, EventEmitter,OnDestroy } from '@angular/core';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'


@Component({
  selector: 'app-changecolor',  
  templateUrl: './changecolor.component.html',
  styleUrls: ['./changecolor.component.scss']
})
export class ChangecolorComponent implements OnInit,  OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private notesService: NotesService) { }
  @Input() color;
  @Output() colorEvent = new EventEmitter();
  @Output() colorEmit = new EventEmitter();

  private token = localStorage.getItem('token');
  ngOnInit() {
  }

  private colorArray = [[{ 'color': '#ffffff', 'name': 'White' },
  { 'color': '#f28b82', 'name': 'Red' },
  { 'color': '#fbbc04', 'name': 'Orange' },
  { 'color': '#fff475', 'name': 'Yellow' }],

  [{ 'color': '#ccff90', 'name': 'Green' },
  { 'color': '#a7ffeb', 'name': 'Teal' },
  { 'color': '#cbf0f8', 'name': 'Blue' },
  { 'color': '#aecbfa', 'name': 'Dark blue' }],

  [{ 'color': '#d7aefb', 'name': 'Purple' },
  { 'color': '#fdcfe8', 'name': 'Pink' },
  { 'color': '#e6c9a8', 'name': 'Brown' },
  { 'color': '#e8eaed', 'name': 'Gray' }]]

  newColor(id) {
    this.colorEmit.emit(id)
    if (this.color != undefined) {
      this.notesService.changesColorNotes(
        {
          "color": id,
          "noteIdList": [this.color.id]
        }).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            localStorage.setItem('colorId', this.color.id)
            this.colorEvent.emit({});
          },
          error => {

          })
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
