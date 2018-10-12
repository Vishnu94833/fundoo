import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
 
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

  constructor(private router: Router, private httpservice: HttpService) { }
  records = {};
  advanceVal: any;
  basicVal: any;
  set = true;
  set1 = true;
  hide = true;
  cards=[];

  ngOnInit() {
    this.records = this.httpservice.getConfig().subscribe(data => {
      console.log('response', data);
      for (var i = 0; i < data["data"].data.length; i++) {
        data["data"].data[i].select = false;
        this.cards.push(data["data"].data[i]);
      }
     var value = data["data"].data.name;
      console.log("cards are", this.cards);
    })

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
        "service": this.service,
        "email": this.model.email,
        "emailVerified": true,
        "password": this.model.password,
        "username": this.model.email,
        // "createdDate": "2018-10-09T06:35:12.617Z",
        // "modifiedDate": "2018-10-09T06:35:12.617Z",

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
  selectCards(card) {
    this.service = card.name;
    card.select = true;
    for (var i = 0; i < this.cards.length; i++) {
      if (card.name == this.cards[i].name) {
        continue;
      }
      this.cards[i].select = false;
    }
  }


}


