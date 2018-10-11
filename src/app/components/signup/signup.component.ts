import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [
    trigger('basicani', [state('open', style({
      // "height": "90px",
      // "width": "150px",
      background: "lightblue",
      "word-wrap": "break-word"
    })),
    state('closed', style({
      // "height": "90px",
      // "width": "150px",
      background: "aquamarine",
      "word-wrap": "break-word"
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
        "background": "skyblue",
        "word-wrap": "break-word"
      })),
      state('closed', style({
        // "height": "90px",
        // "width": "150px",
        "background": "cyan",
        "word-wrap": "break-word"
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
  firstname = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*')]);
  lastname = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*')]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9!@*]*')]);

  getErrorFirstName() {
    return this.firstname.hasError('required') ? 'Enter firstname' :
      this.firstname.hasError('pattern') ? 'Name should be only alphabets' :
        '';
  }
  getErrorLastName() {
    return this.lastname.hasError('required') ? 'Enter lastname' :
      this.lastname.hasError('pattern') ? 'Name should be only alphabets' :
        '';
  }
  getErrorEmail() {
    return this.email.hasError('required') ? 'enter a valid Email ' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  getErrorPassword() {
    return this.password.hasError('required') ? 'enter password' :
      this.password.hasError('pattern') ? 'Password can be only number,alphabets and characters(* and @)' :
        '';
  }
  // getErrorMobileNumber() {
  //   return this.phonenumber.hasError('required') ? 'enter a 10 digit phone number' :
  //       this.phonenumber.hasError('phonenumber') ? 'invalid phone number' :
  //           '';
  // }
  // getErrorMessage() {
  //   return this.email.hasError('required') ? 'You must enter a value' :
  //       this.email.hasError('email') ? 'Not a valid email' :
  //           '';
  // }
  constructor(private router: Router, private httpservice: HttpService) { }
  records = {};
  advanceVal: any;
  basicVal: any;
  set = true;
  set1 = true;
  hide = true;

  advance() {
    this.set = !this.set;
    // this.router.navigateByUrl('/login');
    this.records = this.httpservice.getConfig().subscribe(data => {
      console.log('response', data);
      this.advanceVal = data["data"].data[1].description;
    })
  }

  basic() {
    this.set1 = !this.set1;
    this.records = this.httpservice.getConfig().subscribe(data => {
      console.log('response', data);
      this.basicVal = data["data"].data[0].description;
    })
  }
  ngOnInit() {
    // this.records=this.httpservice.getConfig().subscribe(
    //   data =>{console.log('response',data)}
    // );
  }

  model: any = {};
  service: any;

  sendData() {

    console.log(this.model.firstname);
    console.log(this.model.lastname);
    console.log(this.model.email);
    this.httpservice
      .addConfig('user/userSignUp', {
        "firstName": this.model.firstname,
        "lastName": this.model.lastname,
        "phoneNumber": this.model.phonenumber,
        "service": "string",
        "email": this.model.email,
        "emailVerified": true,
        "password": this.model.password,
        "username": this.model.email,
        "createdDate": "2018-10-09T06:35:12.617Z",
        "modifiedDate": "2018-10-09T06:35:12.617Z",

      })
      .subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
        },
        error => {
          console.log("Error", error);
        }

      );


  }

}


