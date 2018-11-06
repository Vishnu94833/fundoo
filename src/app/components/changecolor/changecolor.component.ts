import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-changecolor',
  templateUrl: './changecolor.component.html',
  styleUrls: ['./changecolor.component.css']
})
export class ChangecolorComponent implements OnInit {

  constructor(private httpservice: HttpService) { }
  @Input() color;
  @Output() colorEvent = new EventEmitter();
  @Output() colorEmit = new EventEmitter();

  token = localStorage.getItem('token');
  ngOnInit() {
  }

  colors(id) {
    this.colorEmit.emit(id)
    if (this.color != undefined) {
      this.httpservice.postarchive('notes/changesColorNotes',
        {
          "color": id,
          "noteIdList": [this.color.id]
        }, this.token).subscribe(
          (data) => {
            // console.log("POST Request is successful ", data);
            // console.log(id)
            // console.log(this.color.id);
            localStorage.setItem('colorId', this.color.id)
            this.colorEvent.emit({});

            console.log();
          },
          error => {
            // console.log("Error", error);
          })
    }
  }



}
