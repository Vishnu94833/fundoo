import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { Params, ActivatedRoute } from '@angular/router';

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
  constructor(private httpservice: HttpService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(
      (params: Params) => {
        this.labelName = params['labelName']
        this.listLabels(this.labelName);

      }

    )

  }

  listLabels(labelName) {
    this.httpservice.List('notes/getNotesListByLabel/' + labelName, {}, this.token)
      .subscribe(
        (data) => {
          // console.log("POST Request is successful ", data);
          this.array1 = data['data'].data;
        },
        error => {
          // console.log("Error", error);
        })
  }


}
