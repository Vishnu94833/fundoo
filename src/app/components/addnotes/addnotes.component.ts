import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-addnotes',
  templateUrl: './addnotes.component.html',
  styleUrls: ['./addnotes.component.css']
})
export class AddnotesComponent implements OnInit {
  token=localStorage.getItem('token');
  @Output() message = new EventEmitter();
  public open:boolean=true;
color:any;
  constructor(private httpservice: HttpService) {}

  ngOnInit() {
  }

  function()
  {
    this.open = !this.open;
  }
  close()
  {
    this.open = !this.open;
  }
  exit()
  {
    this.httpservice.addnotes('notes/addNotes', 
    {
      'title': document.getElementById('title').innerHTML,
      'description':document.getElementById('description').innerHTML,
      'labelIdList':'',
      'checklist':'',
      'isPined':'false',
      'color':this.color
    }, this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
        this.message.emit({

        });
        this.color="#fafafa";
console.log();
      },
      error => {
        console.log("Error", error);
        this.color="#fafafa"
      })
  }

  colour(event)
  {
    console.log(event);
    this.color=event;
  }
  
}
