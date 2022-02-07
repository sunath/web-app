import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import AppProduct from "./Common/product";
import {map, take} from "rxjs";
import firebase from "firebase/compat";
import App = firebase.app.App;

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }


  private create(){
    return this.db.list("/shopping-carts").push({
      dateCreated:new Date().getTime()
    })
  }


   async getCart(){
    const cartId =await this.getOrCreateCart();
    return this.db.list("/shopping-carts/"+cartId)
  }

  // @ts-ignore
  private async getOrCreateCart(){
    const cartId = localStorage.getItem("cartId")

    if (cartId) return cartId;
    const data = await this.create()



    //@ts-ignore
     localStorage.setItem("cartId", data.key)
    //@ts-ignore
     return data.key




  }


  async addToCart(product:AppProduct){
   this.changeProduct(product,1)
  }


  private async changeProduct(product:AppProduct,count:number){
    const cartId = await this.getOrCreateCart()
    const item= this.db.object("/shopping-carts/"+cartId+"/"+product.title)
    const item$ = item.valueChanges().pipe(take(1)).pipe(map((d) => d as any)).subscribe(data => {
        if (data){
          const newCount = data.quantity + count;
          if(newCount <= 0)item.remove();
          else item.update({quantity:newCount })
        }
        else item.update({product:product,quantity:1})
      }
    )
  }
  async removeFromCart(product:AppProduct){
    this.changeProduct(product,-1)
  }

  async clearCart(){
    const id  = await this.getOrCreateCart();
    this.db.object("/shopping-carts/"+id).set({dateCreated:new Date().getTime()})
  }
}
