import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/productcart/product.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { MatDialog } from '@angular/material';
import { ProductconfirmComponent } from '../productconfirm/productconfirm.component';

@Component({
  selector: 'app-productcart',
  templateUrl: './productcart.component.html',
  styleUrls: ['./productcart.component.scss']
})
export class ProductcartComponent implements OnInit {

  private clicked = false;
  private records;
  private cards=[];
  private service;
  constructor(private productService: ProductService, private userService: UserService,public dialog: MatDialog) { }

  ngOnInit() {
    this.getServices();
  }

  openDialog(product): void {
    const dialogRef = this.dialog.open(ProductconfirmComponent, {
      width: '600px',
      height: '300px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.getServices() 
      console.log('The dialog was closed');
     
    });
  }


  click() {
    this.clicked = true;
  }

  unClick() {
    this.clicked = false;
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

  cartAdd(cart) {
    this.productService.addtoCart(
      {
        "productId": cart.id
      }
    ).subscribe(
      (data) => {
        console.log("successfully added to cart", data)
        localStorage.setItem("cartId",data['data']['details'].id)
        this.openDialog(cart);
      }, error => {
        console.log("Error ", error)
      }
    )
  }
}
