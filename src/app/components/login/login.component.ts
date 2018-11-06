import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('animationOption1', [
      state('start', style({
        backgroundColor: 'yellow',
        width: '150px',
        height: '150px'
      })),
      state('end', style({
        backgroundColor: 'green',
        width: '300px',
        height: '300px'
      })),
      transition('start => end', animate(2000)),
      transition('end => start', animate('800ms 0.5s ease-out'))
    ])
  ]
})

export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private httpservice: HttpService, private router: Router) { }
  hide = true;

  ngOnInit() {


  }
  getErrorEmail() {
    return this.email.hasError('required') ? 'Enter a Valid email  ' :
      this.email.hasError('email') ? 'Invalid email' :
        '';
  }
  isLeftVisible: any;
  register() {
    if (!this.email.invalid) {
      this.isLeftVisible = !this.isLeftVisible;
    }
    else {
      alert('enter email address');
    }
  }
  model: any = {};

  loginpost() {

    this.httpservice
      .logPost('user/login', {

        "email": this.model.email,

        "password": this.model.password,

      })
      .subscribe(
        (data) => {
          // console.log("POST Request is successful ", data);
          localStorage.setItem("token", data['id']);
          localStorage.setItem('firstname', data['firstName']);
          localStorage.setItem('lastname', data['lastName']);
          localStorage.setItem('email', data['email']);
          localStorage.setItem('userId', data['userId']);
          localStorage.setItem('imageUrl',data['imageUrl']);
          this.router.navigateByUrl('/homepage');
        },
        error => {
          // console.log("Error", error);
        }

      );






  }



}
