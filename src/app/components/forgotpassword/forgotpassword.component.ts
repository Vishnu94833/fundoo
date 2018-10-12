import { Component, OnInit } from '@angular/core';
import { FormControl,Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorEmail() {
    return this.email.hasError('required') ? 'Enter a Valid email  ' :
        this.email.hasError('email') ? 'Invalid email' :
            '';
  }
  constructor(private httpservice: HttpService,private snackBar:MatSnackBar) { }

  ngOnInit() {
  }
  model:any={}
  goToPassword()
{
  console.log(this.model.email)
  if(!this.email.invalid){
  this.httpservice.postPassword('user/reset',{
    "email": this.model.email,

  })
  .subscribe(
    (data) => {
      console.log("POST Request is successful ", data);
      this.snackBar.open("Valid", "Input",{
        duration : 1000
        })
    },
    error => {
      console.log("Error", error);
      this.snackBar.open("Invalid", "input",{
        duration : 1000
        })
    }
  )
}
else{
  this.snackBar.open("Invalid", "Input",{
    duration : 1000
    })
}
}

}
