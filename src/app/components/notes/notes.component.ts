import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/authgaurd/auth.service';
import { Notedetails } from 'src/app/core/model/notedetails';
import { NotesService } from 'src/app/core/services/notes/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  private array: Notedetails[] = [];
  private pinArray: any = [];
  private token = localStorage.getItem('token');
  private message: boolean;
  constructor( private auth: AuthService,
    private notesService: NotesService) { }

  ngOnInit() {
    this.cardslist();
    this.pinnedList();

  }

  cardslist() {

    this.notesService.getNoteList().subscribe(
      (data) => {
        this.array = [];
        var dataModel: Notedetails[] = data['data']['data'];
        for (var i = dataModel.length - 1; i >= 0; i--) {
          if (dataModel[i].isDeleted == false &&
            dataModel[i].isArchived == false &&
            dataModel[i].isPined == false) {
            this.array.push(dataModel[i]);
          }
        }
      },
      error => {

      });


  }

  pinnedList() {
    this.notesService.getNoteList().subscribe(
      (data) => {
        this.pinArray = [];
        for (var i = data['data'].data.length - 1; i >= 0; i--) {
          if (data['data']['data'][i].isDeleted == false &&
            data['data']['data'][i].isArchived == false &&
            data['data']['data'][i].isPined == true) {
            this.pinArray.push(data['data']['data'][i]);
          }
        }
      },
      error => {

      });
  }

  receive() {
    if (event) {
      this.cardslist();
      this.pinnedList();
    }
  }
  model(modelList: Notedetails) {
    this.array.splice(0, 0, modelList)
  }

}



