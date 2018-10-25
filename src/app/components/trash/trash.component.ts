import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  constructor(private httpservice: HttpService) { }

  array: any = [];
  token = localStorage.getItem('token');
  ngOnInit() {
  


  
    this.array =[];
    this.httpservice.gettrash('notes/getTrashNotesList', this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
        for(var i = data['data'].data.length-1; i>=0;i--)
        {
          if(data['data']['data'][i].isDeleted==true)
          {
            this.array.push(data['data']['data'][i]);
          }
        }
        console.log("array", this.array);

      },
      error => {
        console.log("Error", error);
      });
  

    }

}
