import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { AuthService } from '../../core/services/authgaurd/auth.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  private  array: any = [];
  private pinArray: any = [];
  private token = localStorage.getItem('token');
  private message: boolean;
  constructor(private httpservice: HttpService, private auth: AuthService) { }

  ngOnInit() {
    this.cardslist();
    this.pinnedList();

    // this.cardslist();

  }

  cardslist() {

    this.httpservice.getnotes('notes/getNotesList', this.token).subscribe(
      (data) => {
        this.array = [];
        for (var i = data['data'].data.length - 1; i >= 0; i--) {
          if (data['data']['data'][i].isDeleted == false && 
          data['data']['data'][i].isArchived == false && 
          data['data']['data'][i].isPined == false) {
            this.array.push(data['data']['data'][i]);
          }
        }
      },
      error => {

      });


  }

  pinnedList() {
    this.httpservice.getnotes('notes/getNotesList', this.token).subscribe(
      (data) => {
        this.pinArray = [];
        for (var i = data['data'].data.length - 1; i >= 0; i--) {
          if (data['data']['data'][i].isDeleted == false && 
          data['data']['data'][i].isArchived == false && 
          data['data']['data'][i].isPined == true) {
            this.pinArray.push(data['data']['data'][i]);
          }
        }
      },
      error => {

      });
  }

  receive() {
    if (event) {
      this.cardslist();
      this.pinnedList();
    }
  }

}



