import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit {
  token = localStorage.getItem('token');
  constructor(private httpservice: HttpService) { }
  @Input() archive;
  @Output() archiveEvent = new EventEmitter();
  ngOnInit() {
  }

  archives() {
    this.httpservice.postarchive('notes/archiveNotes',
      {
        "isArchived": true,
        "noteIdList": [this.archive.id]
      }, this.token).subscribe(
        (data) => {
          // console.log("POST Request is successful ", data);
          this.archiveEvent.emit({});
        },
        error => {
          // console.log("Error", error);
        })
  }
}
