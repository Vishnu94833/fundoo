import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpService} from '../../services/http.service';
import { trigger,state,style,transition,animate,keyframes,query,stagger } from '@angular/animations';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [
    trigger('basicani', [ state('open', style({
        // "height": "90px",
        // "width": "150px",
        background: "burlywood",
        "word-wrap" : "break-word"
      })),
      state('closed', style({
        // "height": "90px",
        // "width": "150px",
        background: "goldenrod",
        "word-wrap" : "break-word"
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      // transition('closed => open', [
      //   animate('0.5s')
      // ]),
    ]),
    trigger('advanceani', [
      state('open', style({
        // "height": "90px",
        // "width": "150px",
        "background": "burlywood",
        "word-wrap" : "break-word"
      })),
      state('closed', style({
        // "height": "90px",
        // "width": "150px",
        "background": "goldenrod",
        "word-wrap" : "break-word"
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      // transition('closed => open', [
      //   animate('1s')
      // ]),
    ]),
  ]
})
export class SignupComponent implements OnInit {

  constructor(private router : Router,private httpservice: HttpService) { }
  records={};
  advanceVal: any;
  basicVal:any;
  set = true;
  set1 = true;


  advance()
  {
    this.set = !this.set;
    // this.router.navigateByUrl('/login');
    this.records = this.httpservice.getConfig().subscribe(data => {
      console.log('response',data);
      this.advanceVal = data["data"].data[1].description;
    })
  }

  basic()
  {
    this.set1 = !this.set1;
    this.records = this.httpservice.getConfig().subscribe(data => {
      console.log('response',data);
            this.basicVal = data["data"].data[0].description;
  })
}
  ngOnInit() {
    // this.records=this.httpservice.getConfig().subscribe(
    //   data =>{console.log('response',data)}
    // );
  }

  model:any={};
  service:any;
  
    sendData(){
  
      console.log(this.model.firstname);
      console.log(this.model.lastname);
      console.log( this.model.email);
      this.httpservice
          .addConfig('user/userSignUp', {
          "firstName": this.model.firstname,
          "lastName": this.model.lastname,
          "phoneNumber": this.model.phonenumber,
          "service": "string",
          "email": this.model.email ,
          "emailVerified": true,
          "password": this.model.password,
          "username": this.model.email, 
         "createdDate": "2018-10-09T06:35:12.617Z",
        "modifiedDate": "2018-10-09T06:35:12.617Z",
  
      })
      .subscribe(
        (data )=> {
            console.log("POST Request is successful ", data);
  
        },
        error => {
            console.log("Error", error);
        }
    
      )
  
    }
    
  
  
  
  
    // getData(){
    //   this.httpService. getAddService('user/userSignUp')
    //   .subscribe((data) => { console.log(data)});
  
    // }
  }
  

