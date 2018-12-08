import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/core/services/user/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { ProductService } from 'src/app/core/services/productcart/product.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],

})
export class SignupComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  private firstname = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*')]);
  private lastname = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*')]);
  private email = new FormControl('', [Validators.required, Validators.email]);
  private password = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9!@*]*')]);
  private cartId = localStorage.getItem('cartId')
  private prodId : any = [];

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


  constructor(private router: Router, private userService: UserService, public snackBar: MatSnackBar, private productService: ProductService) { }
  records = {};
  advanceVal: any;
  basicVal: any;
  set = true;
  set1 = true;
  hide = true;
  hide1 = true;
  cards = [];

  ngOnInit() {

    this.records = this.userService.getServiceOfUser().subscribe(data => {
      for (var i = 0; i < data["data"].data.length; i++) {
        data["data"].data[i].select = false;
        this.cards.push(data["data"].data[i]);
      }
      var value = data["data"].data.name;
    })

    this.getCartInformation()
  }

  model: any = {};
  service: any;
  check = false;
  sendData() {
    if (!this.model.firstname.invalid && !this.model.lastname.invalid) {
      if (!this.model.password == this.model.confirmPassword) {
        console.log("give same password to confirm");
        this.check = true;
        this.snackBar.open("Password doesnot match", "signup failed", {
          duration: 2000
        })
        return;
      }
      else {
        this.snackBar.open("Registration Successfull", "signup success", {
          duration: 2000
        })
      }
    }
    else {
      this.snackBar.open("Firstname or Lastname invalid", "signup failed", {
        duration: 2000
      })
      return;
    }

    this.userService
      .userSignUp({
        "firstName": this.model.firstname,
        "lastName": this.model.lastname,
        "phoneNumber": this.model.phonenumber,
        "service": this.service,
        "email": this.model.email,
        "emailVerified": true,
        "password": this.model.password,
        "username": this.model.email,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          console.log(data)
          this.snackBar.open("Registration Successfull", "", {
            duration: 2000
          })
        },
        error => {
          console.log(error)
          this.snackBar.open("Registration Unsuccessfull", "", {
            duration: 2000
          })
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

  backToLogin() {
    this.router.navigate(['/login'])
  }

  goToCart() {
    this.router.navigate(['/productcart'])
  }

  getCartInformation() {
    this.productService.getCartDetails(this.cartId).subscribe(
      data => {
        console.log(data)
        this.prodId = data['data'].productId
        console.log(this.prodId)
      },
      error => {
        console.log(error)
      }
    )
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}


