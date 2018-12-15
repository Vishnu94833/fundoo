import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpservice:HttpService) { }

  addtoCart(body){
    return this.httpservice.postDataJsonType("/productcarts/addToCart",body)
  }

  getCartDetails(cartId){
    return this.httpservice.getDataJsonType("/productcarts/getCartDetails/"+cartId+"")
  }

  myCart(){
    // this.url = this.URL +"/productcarts/myCart"
    return this.httpservice.getDataJsonType("/productcarts/myCart")
  }

  placeOrder(body){
    return this.httpservice.postDataJsonType("/productcarts/placeOrder",body)
  }
}
