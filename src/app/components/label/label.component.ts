import { Component, OnInit, Inject, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SearchsharingService } from '../../core/services/dataservice/searchsharing.service';
import { LabeldeleteComponent } from '../labeldelete/labeldelete.component';


@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {



  private token = localStorage.getItem('token');
  private label = localStorage.getItem('label')

  constructor(private httpservice: HttpService, public dialogRef: MatDialogRef<LabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public dataService: SearchsharingService,public dialog: MatDialog) { }

  @ViewChild('Label') Label: ElementRef;
  @ViewChild('Label1') Label1: ElementRef;
  @ViewChild('myLabel') myLabel: ElementRef;


  @Output() labelList = new EventEmitter();

  openDelete(id): void {
    const dialogRef = this.dialog.open(LabeldeleteComponent, {
      width: 'fit-content',
      height:'fit-content',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true)
      {
      this.httpservice.labelDelete('noteLabels/' + id + '/deleteNoteLabel',
      {
        "label": document.getElementById('label').innerHTML

      }).subscribe(
        (data) => {
          // console.log("DELETE Request is successful ", data);
          this.labelsList();
          this.dataService.changeChipEvent(true);
          // console.log(this.labelList)

        },
        error => {
          // console.log("Error", error);
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
  // value1:[];
  private id = localStorage.getItem('userId');
  addLabel() {
    // console.log(this.id);

    var Label= this.Label.nativeElement.innerHTML;
    // console.log(Label);
    for (var i = 0; i < this.temp.length; i++) {
      if (this.temp[i].label == Label) {
        // console.log(this.temp[i]);
        alert('duplicate data');
        return false;
      }
    }
    this.httpservice.postarchive('noteLabels',
      {
        "label": this.Label.nativeElement.innerHTML,
        "isDeleted": false,
        "userId": this.id
      }, this.token).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
          this.labelsList();
          localStorage.setItem("label", data['label']);
          localStorage.getItem('label')

        },
        error => {
          console.log("Error", error);
        })
  }

  list(event) {
    this.labelList.emit({})
  }

  deleteLabel(id) {

    // this.httpservice.labelDelete('noteLabels/' + id + '/deleteNoteLabel',
    //   {
    //     "label": document.getElementById('label').innerHTML

    //   }).subscribe(
    //     (data) => {
    //       this.labelsList();
    //       this.dataService.changeChipEvent(true);

    //     },
    //     error => {
    //     })

    this.openDelete(id);

  }


  editLabel(id) {
    console.log(this.id);
    this.httpservice.postarchive('noteLabels/' + id + '/updateNoteLabel',
      {
        "label": this.myLabel.nativeElement.innerHTML,
        "isDeleted": false,
        "userId": this.id,
        "id": id
      }
      , this.token).subscribe(
        (data) => {
          // console.log("UPDATE Request is successful ", data);
          // console.log(data);
          

        },
        error => {
          // console.log("Error", error);
        })

  }
  edit(id) {
    this.show = id;
  }


  labelsList() {
    var array = [];
    this.httpservice.getLabels('noteLabels/getNoteLabelList', this.token).subscribe(
      (data) => {
        // console.log("Get Request is successful ", data);
        for(var i=0;i<data['data']['details'].length;i++)
        {
          if(data['data']['details'][i].isDeleted == false)
          { 
              array.push (data['data']['details'][i]);
          }
        }
            this.temp = array;

        // this.temp = data['data'].details;
        // console.log(data['data'].details)
      },
      error => {
        // console.log("Error", error);
      });
  }



}
