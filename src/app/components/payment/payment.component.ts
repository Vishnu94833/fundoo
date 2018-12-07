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

  constructor(private productService: ProductService, private userService: UserService) { }

  ngOnInit() {
    this.getServices()
  }

  getServices() {
    this.records = this.userService.getServiceOfUser()
    .subscribe(data => {
      for (var i = 0; i < data["data"].data.length; i++) {
        data["data"].data[i].select = false;
        this.cards.push(data["data"].data[i]);
      }
      console.log(this.cards[0].id)
      var value = data["data"].data.name;
    })
  }

}
