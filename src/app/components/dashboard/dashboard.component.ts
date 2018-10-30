import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { LabelComponent } from '../label/label.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private router: Router, private httpservice: HttpService, private myRoute: Router, private breakpointObserver: BreakpointObserver, public dialog: MatDialog) { }


  hoverItem: string;
  buttonclick: any = false;
  // openDialog(): void {
  // const dialogRef = this.dialog.open(, {
  //   width: '250px',
  //   // data: {name: this.name, animal: this.animal}
  // });

  // dialogRef.afterClosed().subscribe(result => {
  //   console.log('The dialog was closed');
  // this.buttonclick = true;
  // });
  // }

  model: any = {};
  token = localStorage.getItem('token');
  userId = localStorage.getItem('userId');
  // label = localStorage.getItem('label');
  logout() {
    console.log(this.token);

    // localStorage.removeItem("LoggedInUser");
    // this.myRoute.navigate(["login"]);
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




  ngOnInit() {
    this.firstname = localStorage.getItem('firstname');
    this.lastname = localStorage.getItem('lastname');
    this.email = localStorage.getItem('email');
    this.label = localStorage.getItem('label');
    this.labelList();
  }


  
  openDialog(): void {

    const dialogRef = this.dialog.open(LabelComponent, {
      width: '350px',
      data: { array: this.temp }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)


      this.httpservice.postarchive('noteLabels',
        {
          "label": result,
          "isDeleted": false,
          "userId": this.userId
        }, this.token).subscribe(
          (data) => {
            console.log("POST Request is successful ", data);
            localStorage.setItem("label", data['label']);
            localStorage.getItem('label')
            this.labelList();

          },
          error => {
            console.log("Error", error);
          })



    });
  }

  labelList() {


    this.httpservice.getLabels('noteLabels/getNoteLabelList', this.token).subscribe(
      (data) => {
        console.log("Get Request is successful ", data);
        // this.temp = [];
        this.temp = data['data'].details;
        // for (let index = 0; index < data['data'].details.length; index++) {
        //   if (data['data'].details[index].isDeleted == false) {


        //     this.temp.push(data['data'].details[index])
        //   }
        // }
        console.log(data['data'].details)
        console.log(this.temp)

      },
      error => {
        console.log("Error", error);
      });


  }
}


