import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  archivearray: any = [];
  token = localStorage.getItem('token');
  @Output() archiveEvent=new EventEmitter();

  constructor(private httpservice: HttpService) { }

  ngOnInit() {
    this.getArchiveList();
  }

  unArchive(archive) {
    this.httpservice.postarchive('notes/archiveNotes',
      {
        "isArchived": false,
        "noteIdList": [archive]
      }, this.token).subscribe(
        (data) => {
          // console.log("POST Request is successful ", data);
          this.getArchiveList();
        },
        error => {
          // console.log("Error", error);
        })
  }
  getArchiveList() {

    this.archivearray = [];
    this.httpservice.getarchive('notes/getArchiveNotesList', this.token).subscribe(
      (data) => {
        // console.log("GET Request is successful ", data); 
        for (var i = data['data'].data.length - 1; i >= 0; i--) {
          this.archivearray.push(data['data']['data'][i]);
          this.archiveEvent.emit({});
        }
        // console.log("array", this.array);
      },
      error => {
        // console.log("Error", error);
      });

  }

  new(event) {

    this.getArchiveList();

  }


}
