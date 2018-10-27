import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
// import { EventEmitter } from 'events';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent implements OnInit {

  public open: boolean = true;
  token = localStorage.getItem('token');

  constructor(private httpservice: HttpService) { }
@Input() carddel;
@Output() deleteevent=new EventEmitter();


  ngOnInit() {
  }

  function() {
    this.open = !this.open;
  }
  close() {
    this.open = !this.open;
  }
  delete() {
console.log("delete 0 is successful")
    this.httpservice.postarchive('notes/trashNotes', 
    {
      "isDeleted": true,
      "noteIdList":[this.carddel.id]
    }, this.token).subscribe(
      (data) => {
        console.log("delete 1 is succesful")
        console.log("POST Request is successful ", data);
        this.deleteevent.emit({

        })
      },
      error => {
        
        console.log("errorrrrrrrrrrrrrrrrrrrrrr")
        console.log("Error", error);
      }
    )

  }
}
