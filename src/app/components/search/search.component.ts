import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { SearchsharingService } from '../../../app/services/searchsharing.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  array: any;
  inputData: any;
  token = localStorage.getItem('token');
  constructor(public httpservice: HttpService, public data: SearchsharingService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      this.inputData = message;
    })
    this.cardslist();
  }


  cardslist() {
    this.array = [];
    this.httpservice.getnotes('notes/getNotesList', this.token).subscribe(
      (data) => {
        // console.log("GET Request is successful ", data);
        for (var i = data['data'].data.length - 1; i >= 0; i--) {
          if (data['data']['data'][i].isDeleted == false && data['data']['data'][i].isArchived == false) {
            this.array.push(data['data']['data'][i]);
          }
        }
        // console.log("array", this.array);

      },
      error => {
        // console.log("Error", error);
      });


  }

}
