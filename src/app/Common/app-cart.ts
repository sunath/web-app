import AppProduct from "./product";
import {AppCartProduct} from "./app-cart-product";
import {CartProduct} from "./cart-product";

export class AppCart{

  constructor(private _products?:AppCartProduct[]) {
  }

  get products(){

    return this._products ? this._products.map(e => new CartProduct(e)) : []
  }

  get AllItemsCount(){

    // @ts-ignore
    return this._products ? this._products.map(e => e.quantity).reduce((p,n) => p+n) :  0;

  }


  get TotalPrice(){
    return this.products.map(e => e.TotalPrice).reduce((p,n) => p+n)
  }
}
