import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  array: any = [];
  token = localStorage.getItem('token');
  message: boolean;
  constructor(private httpservice: HttpService, private auth: AuthService) { }

  ngOnInit() {
    this.cardslist();

  }





  cardslist() {
    this.array = [];
    this.httpservice.getnotes('notes/getNotesList', this.token).subscribe(
      (data) => {
        console.log("GET Request is successful ", data);
        for (var i = data['data'].data.length - 1; i >= 0; i--) {
          if (data['data']['data'][i].isDeleted == false && data['data']['data'][i].isArchived == false) {
            this.array.push(data['data']['data'][i]);
          }
        }
        console.log("array", this.array);

      },
      error => {
        console.log("Error", error);
      });


  }

  receive() {
    console.log("event is here....")

    if (event) {
      this.cardslist();
    }
  }

}



