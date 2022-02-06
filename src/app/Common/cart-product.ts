import {AppCartProduct} from "./app-cart-product";

export  class CartProduct{

  constructor(public cartItem:AppCartProduct) {
  }

  // @ts-ignore
  get TotalPrice(){
    return this.cartItem.product.price * this.cartItem.quantity;
  }
}
