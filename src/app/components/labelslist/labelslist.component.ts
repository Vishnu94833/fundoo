import { Component, OnInit,OnDestroy } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-labelslist',
  templateUrl: './labelslist.component.html',
  styleUrls: ['./labelslist.component.scss']
})
export class LabelslistComponent implements OnInit , OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private params: any;
  private array1: any[];
  private labelName: any;
  private token = localStorage.getItem('token');
  constructor(
    private router: ActivatedRoute,
    private notesService: NotesService) { }

  ngOnInit() {
    this.router.params.pipe(takeUntil(this.destroy$)).subscribe(
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
    .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          LoggerService.log("POST Request is successful ", data);
          this.array1 = data['data'].data;
        },
        error => {
          LoggerService.log("Error", error);
        })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
