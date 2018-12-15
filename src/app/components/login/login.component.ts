import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { ProductService } from 'src/app/core/services/productcart/product.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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

export class LoginComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  public cardObj = {};
  private clicked = false;
  private records;
  private cards = [];
  private service;
  private cartId = localStorage.getItem('cartId')
  private prodId: any = [];
  private getService;
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private userService: UserService, private snackBar: MatSnackBar,
    private router: Router, private productService: ProductService) { }
  hide = true;

  ngOnInit() {
    this.getServices()
    this.getCartInformation()

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

    this.userService
      .login({
        "email": this.model.email,
        "password": this.model.password,
        "cartId": localStorage.getItem("cartId")
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.snackBar.open("Login Successfull", "", {
            duration: 2000
          })
          localStorage.setItem("token", data['id']);
          localStorage.setItem('firstname', data['firstName']);
          localStorage.setItem('lastname', data['lastName']);
          localStorage.setItem('email', data['email']);
          localStorage.setItem('userId', data['userId']);
          localStorage.setItem('imageUrl', data['imageUrl']);
          var token = localStorage.getItem("token");
          var pushToken = localStorage.getItem('pushToken')
          var body = {
            "pushToken": pushToken
          }
          this.userService.registerPushToken(body).subscribe(
            data => {
              LoggerService.log("post of pushToken is successful", data)
            })
          this.router.navigateByUrl('/homepage');
        },
        error => {
          this.snackBar.open("Login Failed", "", {
            duration: 2000
          })
        }

      );

  }


  getServices() {
    this.records = this.userService.getServiceOfUser()
      .subscribe(data => {
        for (var i = 0; i < data["data"].data.length; i++) {
          data["data"].data[i].select = false;
          this.cards.push(data["data"].data[i]);
        }
        console.log(this.cards)
        var value = data["data"].data.name;
      })
  }

  selectCards(product) {
    console.log("selected")
    this.service = product.name;
    console.log(this.service)
    product.select = true;
    for (var i = 0; i < this.cards.length; i++) {
      if (product.name == this.cards[i].name) {
        continue;
      }
      this.cards[i].select = false;
    }
  }

  getCartInformation() {
    this.productService.getCartDetails(this.cartId).subscribe(
      data => {
        console.log(data)
        this.prodId = data['data'].productId
        console.log(this.prodId)
        this.getService = data['data']['product'].name;
      },
      error => {
        console.log(error)
      }
    )
  }

  cartAdd(cart) {
    this.productService.addtoCart(
      {
        "productId": cart.id
      }
    ).subscribe(
      (data) => {
        console.log("successfully added to cart", data)
        localStorage.setItem("cartId", data['data']['details'].id)
        // this.openDialog(cart);
      }, error => {
        console.log("Error ", error)
      }
    )
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
