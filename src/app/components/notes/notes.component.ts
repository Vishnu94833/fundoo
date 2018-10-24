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
  receive() {
    console.log("event is here....")
    if (event) {
      this.httpservice.getnotes('notes/getNotesList', this.token).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);

          this.array = data['data'].data
          console.log("array", this.array);

        }
        // ,
        // error => {
        //   console.log("Error", error);
        // }
      );
    }
  }

  cardslist() {
    this.httpservice.getnotes('notes/getNotesList', this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);

        this.array = data['data'].data
        console.log("array", this.array);

      },
      error => {
        console.log("Error", error);
      });
  

}


}



