import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotesService } from 'src/app/core/services/notes/notes.service';

@Component({
  selector: 'app-changecolor',  
  templateUrl: './changecolor.component.html',
  styleUrls: ['./changecolor.component.scss']
})
export class ChangecolorComponent implements OnInit {

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
        }).subscribe(
          (data) => {
            localStorage.setItem('colorId', this.color.id)
            this.colorEvent.emit({});
          },
          error => {

          })
    }
  }



}
