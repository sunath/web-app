import {Component, Input, OnInit} from '@angular/core';
import AppProduct from "../../Common/product";
import {ShoppingCartService} from "../../shopping-cart.service";

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product:AppProduct | any;
  @Input('cart') cart:any;

  constructor(private cartService:ShoppingCartService) { }

  ngOnInit(): void {
    console.log(this.cart)
  }


  addToCart() {
    this.cartService.addToCart(this.product)
  }


  removeFromCart(){
    this.cartService.removeFromCart(this.product)
  }

  getQuantity(){
    //@ts-ignore
    const items = (this.cart.filter(v => v.product && v.product.title == this.product.title))
    console.log("cart",this.cart)
    const item = items[0]
    if(item && item.quantity){
      return item.quantity
    }
    return 0;
  }

}
