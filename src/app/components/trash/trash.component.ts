import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  constructor(private httpservice: HttpService) { }

  array1: any = [];
  token = localStorage.getItem('token');
  ngOnInit() {



    // this.array1 = [];
    this.httpservice.gettrash('notes/getTrashNotesList', this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
        for (var i = 0; i<data["data"]['data'].length; i++) {
          // if (data['data']['data'][i].isDeleted == true) {
            this.array1=(data["data"]['data']);
          }
        // }
        console.log("array", this.array1);

      },
      error => {
        console.log("Error", error);
      });


  }


  deleteForever(notes) {
console.log(notes.id);

    // var id = note.id;
console.log(notes.label);
    this.httpservice.postarchive('notes/deleteForeverNotes',
      {    
        "isDeleted": false,
        "noteIdList": [notes.id]

      }, this.token).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);

        },
        error => {
          console.log("Error", error);
        }
      )

  }


}
