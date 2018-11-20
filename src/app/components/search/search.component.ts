import { Component, OnInit } from '@angular/core';
import { SearchsharingService } from '../../core/services/dataservice/searchsharing.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private array: any;
  private inputData: any;
  private token = localStorage.getItem('token');
  constructor(public data: SearchsharingService,
    private notesService: NotesService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      this.inputData = message;
    })
    this.cardslist();
  }


  cardslist() {
    this.array = [];
    this.notesService.getNoteList().subscribe(
      (data) => {
        LoggerService.log("GET Request is successful ", data);
        for (var i = data['data'].data.length - 1; i >= 0; i--) {
          if (data['data']['data'][i].isDeleted == false && data['data']['data'][i].isArchived == false) {
            this.array.push(data['data']['data'][i]);
          }
        }
      },
      error => {
        LoggerService.error("Error", error);
      });


  }

}
