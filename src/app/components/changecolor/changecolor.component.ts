import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-changecolor',
  templateUrl: './changecolor.component.html',
  styleUrls: ['./changecolor.component.css']
})
export class ChangecolorComponent implements OnInit {

  constructor(private httpservice:HttpService) { }
  token=localStorage.getItem('token');
  ngOnInit() {
  }

  change()
  {
    console.log("successfully changed color........")
    this.httpservice.changecolor('notes/changesColorNotes', 
    {
      "color": "string"
    }, this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
     
console.log();
      },
      error => {
        console.log("Error", error);
      })
  }

}
