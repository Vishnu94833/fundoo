import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { HttpService } from '../../core/services/http/http.service';
import { LabelComponent } from '../label/label.component';
import { SearchsharingService } from '../../core/services/dataservice/searchsharing.service';
import { environment } from '../../../environments/environment';
import { CropimageComponent } from '../cropimage/cropimage.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

    private hoverItem: string;
    private  buttonclick: any = false;
    private title = "Fundoo";
    private model: any = {};
    private token = localStorage.getItem('token');
    private userId = localStorage.getItem('userId');


  constructor(
    private router: Router, private httpservice: HttpService,
    private myRoute: Router, private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog, public data: SearchsharingService
  ) { }


  /**
   * @description function to logout of the fundoo notes homgepage
   */
  logout() {
    console.log(this.token);
    this.httpservice.logoutPost('user/logout', this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
        localStorage.removeItem("token");
        localStorage.removeItem('firstname');
        localStorage.removeItem('lastname');
        localStorage.removeItem('email');
        localStorage.removeItem('userId');
        this.router.navigateByUrl('/login');
      },
      error => {
        console.log("Error", error);
      }

    );
  }

  private firstname: any;
  private  lastname: any;
  private email: any;
  private label: any;
  private temp: any;
  private inputData: any;



  ngOnInit() {
    this.firstname = localStorage.getItem('firstname');
    this.lastname = localStorage.getItem('lastname');
    this.email = localStorage.getItem('email');
    this.label = localStorage.getItem('label');
    this.labelList();
  }

  /**
   * @description function to change title 
   * @param title 
   */
  changeTitle(title) {
    this.title = title;
  }

  /**
   * @description open dialog box to create ,update,delete labels
   */
  openDialog(): void {

    const dialogRef = this.dialog.open(LabelComponent, {
      width: '350px',
      data: { array: this.temp }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.labelList();
    });
  }

  /**
   * @description function to get labels list after creating new labels
   */
  labelList() {
    var array = [];
    this.httpservice.getLabels('noteLabels/getNoteLabelList', this.token).subscribe(
      (data) => {
        // console.log("Get Request is successful ", data);
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            array.push(data['data']['details'][i]);
          }
        }
        this.temp = array;
        // this.temp.sort(function (a, b) {
        //   var nameA = a.label.toLowerCase(), nameB = b.label.toLowerCase()
        //   if (nameA < nameB)
        //     return -1
        //   if (nameA > nameB)
        //     return 1
        //   return 0
        // })

      },
      error => {
      });
  }

  navigateSearch() {
    this.router.navigate(['homepage/search']);
  }

  down() {
    this.data.changeMessage(this.inputData);

  }

  /**
   * @description function to navigate to the labels page by their respective labels
   * @param labelName 
   */
  labelsPage(labelName) {
    var labelname = labelName.label;
    this.router.navigate(['homepage/labelslist/' + labelname]);
  }

  private list = 0;
  gridView() {
    this.data.changeGridEvent(true);
    this.list = 1;
  }
  grid() {
    this.data.changeGridEvent(false);
    this.list = 0;
  }
  ProfilePath: any;
  selectedFile = null;

  public pic;
  public image2 = localStorage.getItem('imageUrl');
  img = environment.apiUrl + this.image2;

  onFileUpload(event) {
    var token = localStorage.getItem('token');
    this.profileCropOpen(event);

    this.selectedFile = event.path[0].files[0];
    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile, this.selectedFile.name);
  }
  private image = {};

  clickLabel(labelsList) {
    var labelsList = labelsList.label;
    this.router.navigate(['/home/label/' + labelsList])
  }
  profileCropOpen(data): void { //Function for the dialog box
    const dialogRefPic = this.dialog.open(CropimageComponent, {
      width: '600px',
      // height:'600px',
      data: data
    });

    dialogRefPic.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.data.currentMsg.subscribe(message => this.pic = message)
      console.log("pic", this.pic);
      if (this.pic == true) {
        this.image2 = localStorage.getItem('imageUrl');
        this.img = environment.apiUrl + this.image2;
      }

    });
  }


}


