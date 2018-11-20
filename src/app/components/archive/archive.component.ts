import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotesService } from 'src/app/core/services/notes/notes.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  private archivearray: any = [];
  private token = localStorage.getItem('token');
  @Output() archiveEvent = new EventEmitter();

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.getArchiveList();
  }


  getArchiveList() {

    this.archivearray = [];
    this.notesService.getArchiveNotesList().subscribe(
      (data) => {
        for (var i = data['data'].data.length - 1; i >= 0; i--) {
          this.archivearray.push(data['data']['data'][i]);
          this.archiveEvent.emit({});
        }
      },
      error => {
      });

  }

  new(event) {

    this.getArchiveList();

  }

}
