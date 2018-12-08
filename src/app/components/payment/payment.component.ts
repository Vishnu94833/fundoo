import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { ProductService } from 'src/app/core/services/productcart/product.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  private records;
  private cards=[];
  private next;
  private signin = 0;
  private cartId = localStorage.getItem('cartId') ;
  private price;
  private desc;

  constructor(private productService: ProductService, private userService: UserService) { }

  ngOnInit() {
    this. getCartInformation()
  }

  getCartInformation() {
    this.productService.getCartDetails(this.cartId).subscribe(
      data => {
        console.log(data)
        this.price = data['data']['product'].price
        this.desc =  data['data']['product'].description

      },
      error => {
        console.log(error)
      }
    )
  }


  nextStep(){
   this.signin = 1;
  }


}
