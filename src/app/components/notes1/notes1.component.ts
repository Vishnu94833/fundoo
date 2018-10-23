import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-notes1',
  templateUrl: './notes1.component.html',
  styleUrls: ['./notes1.component.css']
})
export class Notes1Component implements OnInit {
  token=localStorage.getItem('token');

//   body=
// {
//   'title': document.getElementById('title'),
//   'description':document.getElementById('description'),
//   'labelIdList':'',
//   'checklist':'',
//   'isPined':'false'
// }
  public open:boolean=true;
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
      'title': document.getElementById('title'),
      'description':document.getElementById('description'),
      'labelIdList':'',
      'checklist':'',
      'isPined':'false'
    }, this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
        // localStorage.removeItem("token");
        // this.router.navigateByUrl('/login');
      },
      error => {
        console.log("Error", error);
      }

    );
  }

}
