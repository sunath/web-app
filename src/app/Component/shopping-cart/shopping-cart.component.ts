import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../../shopping-cart.service";
import {AppCart} from "../../Common/app-cart";
import {filter, map} from "rxjs";
import {AppCartProduct} from "../../Common/app-cart-product";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  userCart:AppCart;

  constructor(private cartService:ShoppingCartService) {
    this.userCart = new AppCart();
  }

  async ngOnInit() {
    const data = await this.cartService.getCart();
    //@ts-ignore
    data.valueChanges().pipe(map(e => e.filter(m => m.product))).subscribe(data => {
      this.userCart = new AppCart(data as AppCartProduct[])
    })
  }

}
