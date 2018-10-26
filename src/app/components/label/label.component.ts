import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {

  token=localStorage.getItem('token');
  constructor(private httpservice: HttpService) {}
  ngOnInit() {
  }

  addLabel()
  {
    this.httpservice.labelAdd('noteLabels', 
    {
      "label": "string",
      "isDeleted": true,
      "userId": "string"
    }, this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
        // this.message.emit({});
console.log();
      },
      error => {
        console.log("Error", error);
      })
  }

}
