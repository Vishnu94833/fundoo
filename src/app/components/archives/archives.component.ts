import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit {
  token=localStorage.getItem('token');
  constructor(private httpservice: HttpService) { }
  @Input() archive;
  ngOnInit() {
  }

  archives()
  {
    this.httpservice.postarchive('notes/archiveNotes', 
    {
      "isArchived": true,
      "noteIdList":[this.archive.id]
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
