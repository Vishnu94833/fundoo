import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';

@Component({
  selector: 'app-labelslist',
  templateUrl: './labelslist.component.html',
  styleUrls: ['./labelslist.component.scss']
})
export class LabelslistComponent implements OnInit {
  private params: any;
  private array1: any[];
  private labelName: any;
  private token = localStorage.getItem('token');
  constructor(
    private router: ActivatedRoute,
    private notesService: NotesService) { }

  ngOnInit() {
    this.router.params.subscribe(
      (params: Params) => {
        this.labelName = params['labelName']
        this.listLabels(this.labelName);

      }

    )

  }


  /**
   * @description function to get notes list by their respective labels
   * @param labelName 
   */
  listLabels(labelName) {
    this.notesService.getNotesListByLabel(labelName)
      .subscribe(
        (data) => {
          LoggerService.log("POST Request is successful ", data);
          this.array1 = data['data'].data;
        },
        error => {
          LoggerService.log("Error", error);
        })
  }


}
