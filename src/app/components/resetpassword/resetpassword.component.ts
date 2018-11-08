import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../core/services/http/http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private httpservice: HttpService, public route:ActivatedRoute,) { }
  public accessToken=this.route.snapshot.params.forgotToken;

  password = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9!@*]*')]);

  ngOnInit() {
  }
  getErrorPassword() {
    return this.password.hasError('required') ? 'enter password' :
      this.password.hasError('pattern') ? 'Password can be only number,alphabets and characters(* and @)' :
        '';
  }
  info:any={}
  public input = new FormData();
  
  resetPassword(){
      var body={
        "newPassword": this.info.password
      }
      if(this.info.password.length==0){
        // console.log("please enter the password");
        return;
      }
      this.input.append('newPassword', this.info.password);
      // console.log(this.input)
      this.httpservice.postReset("user/reset-password",body,this.accessToken).subscribe(response=>{
        // console.log("successfull",response);
      },error=>{
        // console.log("failed",error)
      })
      // console.log("accessToken",this.accessToken)
    }

      


  }


