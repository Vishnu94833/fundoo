import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-changecolor',
  templateUrl: './changecolor.component.html',
  styleUrls: ['./changecolor.component.scss']
})
export class ChangecolorComponent implements OnInit {

  constructor(private httpservice: HttpService) { }
  @Input() color;
  @Output() colorEvent = new EventEmitter();
  @Output() colorEmit = new EventEmitter();

  token = localStorage.getItem('token');
  ngOnInit() {
  }

  colorArray = [[{ 'color': '#ffffff', 'name': 'White' },
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
      this.httpservice.postarchive('notes/changesColorNotes',
        {
          "color": id,
          "noteIdList": [this.color.id]
        }, this.token).subscribe(
          (data) => {

            localStorage.setItem('colorId', this.color.id)
            this.colorEvent.emit({});

            console.log();
          },
          error => {

          })
    }
  }



}
