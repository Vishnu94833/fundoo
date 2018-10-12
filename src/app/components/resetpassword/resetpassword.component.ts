import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private httpservice: HttpService) { }
  password = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9!@*]*')]);

  ngOnInit() {
  }
  getErrorPassword() {
    return this.password.hasError('required') ? 'enter password' :
      this.password.hasError('pattern') ? 'Password can be only number,alphabets and characters(* and @)' :
        '';
  }

  model: any={};
  resetPassword() 
  {

    // console.log(this.model.email);
    console.log(this.model.password);
    this.httpservice
      .resPass('user/reset-password', {
        
        
        
        "newPassword": this.model.password,
        
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

}
