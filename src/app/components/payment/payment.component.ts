import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { ProductService } from 'src/app/core/services/productcart/product.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  private cartId = localStorage.getItem('cartId');
  public flag2 = false;
  public flag = false;
  public flag3 = false;
  public cardObj = {};
  public emptyCart = false;
  public value = 25;
  public address;
  public addNotGiven = false;
  public firstCss = true;
  private details;
  public forCss;

  constructor(private productService: ProductService, private userService: UserService) { }


  ngOnInit() {
    this.addNotGiven = false;
    if (localStorage.getItem("cartId") != null) {
      this.getCardDetails();
    }
  }

  getCardDetails() {
    this.productService.myCart()
      .subscribe((data) => {

        console.log(data['data']); 
        this.details = data['data'][0].product
        console.log(this.details)
      },
      (error) => {
        console.log(error)
      }
      );
  }


  placeOrder() {
    if (localStorage.getItem("cartId") == null) {
      console.log("cartId is not present");
      return;
    }
    if (this.address != undefined) {
      let reqBody = {
        "cartId": localStorage.getItem("cartId"),
        "address": this.address
      }
      this.productService.placeOrder(reqBody)
        .subscribe((data) => {
          console.log(data);
          this.value = 100
          this.flag3 = true; this.flag = false;
          this.forCss = false

        });
    }
    else {
      console.log("enter address");
      this.addNotGiven = true

    }

  }

}
