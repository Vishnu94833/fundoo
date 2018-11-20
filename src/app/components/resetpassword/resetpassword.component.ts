import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private userService: UserService, public route: ActivatedRoute, ) { }

  public accessToken = this.route.snapshot.params.forgotToken;
  password = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9!@*]*')]);

  ngOnInit() {
  }
  getErrorPassword() {
    return this.password.hasError('required') ? 'enter password' :
      this.password.hasError('pattern') ? 'Password can be only number,alphabets and characters(* and @)' :
        '';
  }
  private info: any = {}
  public input = new FormData();

  resetPassword() {
    var body = {
      "newPassword": this.info.password
    }
    if (this.info.password.length == 0) {
      return;
    }
    this.input.append('newPassword', this.info.password);
    this.userService.resetPassword(body).subscribe(response => {
    }, error => {
    })
  }
}


