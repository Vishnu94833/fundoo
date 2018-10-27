import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {

  token = localStorage.getItem('token');
 

  constructor(private httpservice: HttpService) { }
  ngOnInit() {
  }
  id = localStorage.getItem('userId');
  addLabel() {
    console.log(this.id);
    this.httpservice.postarchive('noteLabels',
      {
        "label": document.getElementById('label1').innerHTML,
        "isDeleted": false,
        "userId": this.id
      }, this.token).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
          // this.message.emit({});
        },
        error => {
          console.log("Error", error);
        })
  }

}
