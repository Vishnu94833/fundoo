import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'
import { UserService } from 'src/app/core/services/user/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit,  OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorEmail() {
    return this.email.hasError('required') ? 'Enter a Valid email  ' :
      this.email.hasError('email') ? 'Invalid email' :
        '';
  }
  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  private model: any = {}
  goToPassword() {
    console.log(this.model.email)
    if (!this.email.invalid) {
      this.userService.newPassword({
        "email": this.model.email,

      })
      .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            this.snackBar.open("Valid", "Input", {
              duration: 1000
            })
          },
          error => {
            this.snackBar.open("Invalid", "input", {
              duration: 1000
            })
          }
        )
    }
    else {
      this.snackBar.open("Invalid", "Input", {
        duration: 1000
      })
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
