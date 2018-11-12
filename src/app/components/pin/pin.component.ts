import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {

token=localStorage.getItem('token')

  constructor(private httpservice:HttpService) { }

  ngOnInit() {
    // this.pinned(id)
  }

pinned(id)
{
  this.httpservice.addnotes('notes/addNotes',
      {
        "isPined": true,
        "noteId":id
      }, this.token).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
        
        },
        error => {
          console.log("Error", error);
     
        })
}

}
