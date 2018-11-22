import { Component, OnInit, Inject, OnDestroy, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { NotesService } from '../../core/services/notes/notes.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SearchsharingService } from '../../core/services/dataservice/searchsharing.service';
import { LabeldeleteComponent } from '../labeldelete/labeldelete.component';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'


@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit , OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();


  private token = localStorage.getItem('token');
  private label = localStorage.getItem('label')

  constructor(private notesService: NotesService, public dialogRef: MatDialogRef<LabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: SearchsharingService, public dialog: MatDialog) { }

  @ViewChild('Label') Label: ElementRef;
  @ViewChild('Label1') Label1: ElementRef;
  @ViewChild('myLabel') myLabel: ElementRef;


  @Output() labelList = new EventEmitter();

  openDelete(id): void {
    const dialogRef = this.dialog.open(LabeldeleteComponent, {
      width: 'fit-content',
      height: 'fit-content',
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      if (result == true) {
        this.notesService.deleteLabel(id
         ).subscribe(
            (data) => {
              LoggerService.log("DELETE Request is successful ", data);
              this.labelsList();
              this.dataService.changeChipEvent(true);
            },
            error => {
              LoggerService.log("Error", error);
            })

      }
    });
  }


  ngOnInit() {
    this.labelsList();
  }
  private array: any = {};
  private temp: any = {};
  private model: any = {};
  private hoverItem: string;
  private labelName: string;
  private changeText: string;
  private show;
  private res: string;
  private id = localStorage.getItem('userId');


  /**
   * @description function to create new Label
   */
  addLabel() {
    var Label = this.Label.nativeElement.innerHTML;
    for (var i = 0; i < this.temp.length; i++) {
      if (this.temp[i].label == Label) {
        alert('duplicate data');
        return false;
      }
    }
    this.notesService.addLabels(
      {
        "label": this.Label.nativeElement.innerHTML,
        "isDeleted": false,
        "userId": this.id
      }).pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          LoggerService.log("POST Request is successful ", data);
          this.labelsList();
          this.dialogRef.close();
        },
        error => {
          LoggerService.error("Error", error);
        })
  }

  list(event) {
    this.labelList.emit({})
  }

  deleteLabel(id) {
    this.openDelete(id);
  }

/**
 * @description function to edit and update labels
 * @param id 
 */
  editLabel(id) {
    this.notesService.editLabels(id,
      {
        "label": this.myLabel.nativeElement.innerHTML
      }
    ).pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.labelList.emit({})
        LoggerService.log("UPDATE Request is successful ", data);
      },
      error => {
        LoggerService.log("Error", error);
      })
  }


  edit(id) {
    this.show = id;
  }


  labelsList() {
    var array = [];
    this.notesService.getLabels().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.array=[]
        LoggerService.log("Get Request is successful ", data);
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            array.push(data['data']['details'][i]);
          }
        }
        this.temp = array;
      },
      error => {
        LoggerService.log("Error", error);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
