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

  constructor(private router: Router, private httpservice: HttpService, 
    private myRoute: Router,private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog, public data: SearchsharingService) { }


  hoverItem: string;
  buttonclick: any = false;

    title;
  model: any = {};
  token = localStorage.getItem('token');
  userId = localStorage.getItem('userId');

  logout() {
    console.log(this.token);
    this.httpservice.logoutPost('user/logout', this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
        localStorage.removeItem("token");
        this.router.navigateByUrl('/login');
      },
      error => {
        console.log("Error", error);
      }

    );
  }

  firstname: any;
  lastname: any;
  email: any;
  label: any;
  temp: any;
  inputData: any;



  ngOnInit() {
    this.firstname = localStorage.getItem('firstname');
    this.lastname = localStorage.getItem('lastname');
    this.email = localStorage.getItem('email');
    this.label = localStorage.getItem('label');
    this.labelList();
  }

  changeTitle(title)
  {
    this.title=title;
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(LabelComponent, {
      width: '350px',
      data: { array: this.temp }
    });
    dialogRef.afterClosed().subscribe(result => {
            this.labelList();
    });
  }

  labelList() {
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

  labelsPage(labelName) {
    var labelname = labelName.label;
    // console.log(labelname)
    this.router.navigate(['homepage/labelslist/' + labelname]);
  }

  list = 0;
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
  image = {};

  clickLabel(labelsList) {
    var labelsList = labelsList.label;
    this.router.navigate(['/home/label/' + labelsList])
  }
  profileCropOpen(data): void { //Function for the dialog box
    const dialogRefPic = this.dialog.open(CropimageComponent, {
      width: '450px',
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


