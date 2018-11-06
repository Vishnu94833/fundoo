import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  array: any = [];
  token = localStorage.getItem('token');
  constructor(private httpservice: HttpService) { }

  ngOnInit() {


    // this.array = [];
    // this.httpservice.getarchive('notes/getArchiveNotesList', this.token).subscribe(
    //   (data) => {
    //     console.log("GET Request is successful ", data);
    //     for (var i = data['data'].data.length - 1; i >= 0; i--) {

    //       this.array.push(data['data']['data'][i]);

    //     }
    //     console.log("array", this.array);

    //   },
    //   error => {
    //     console.log("Error", error);
    //   });
    this.getArchiveList();
  }

  unArchive(archive) {
    this.httpservice.postarchive('notes/archiveNotes',
      {
        "isArchived": false,
        "noteIdList": [archive]
      }, this.token).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
          // this.archiveEvent.emit({});
          this.getArchiveList();

          console.log();
        },
        error => {
          console.log("Error", error);
        })
  }
  getArchiveList() {


    this.array = [];
    this.httpservice.getarchive('notes/getArchiveNotesList', this.token).subscribe(
      (data) => {
        console.log("GET Request is successful ", data);
        for (var i = data['data'].data.length - 1; i >= 0; i--) {

          this.array.push(data['data']['data'][i]);

        }
        console.log("array", this.array);

      },
      error => {
        console.log("Error", error);
      });
  }
  new(event) {
    this.getArchiveList();
  }


}
