import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-labelslist',
  templateUrl: './labelslist.component.html',
  styleUrls: ['./labelslist.component.css']
})
export class LabelslistComponent implements OnInit {
  
  array: any[];

  constructor(private httpservice:HttpService) { }

  ngOnInit() {
    this.cardslist();
  }


  cardslist() {
    
    this.httpservice.getnotes('notes/getNotesList', this.token).subscribe(
      (data) => {
        this.array = [];
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
  token(arg0: string, token: any): any {
    throw new Error("Method not implemented.");
  }

}
