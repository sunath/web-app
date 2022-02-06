import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, of, switchMap } from 'rxjs';
import AppProduct from '../Common/product';
import AppProductState from '../Common/product-state';
import { AppUser } from '../Common/User';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private db:AngularFireDatabase) { }

  create(f:any){
    this.db.list('/products').push(f);
  }

  getAllKeys(){
    // return this.db.list('/products').valueChanges().pipe(map((value) => {
    //   for(let i = 0 ; i < value.length;i++){
    //     value[i] = value[i] as AppProduct
    //   }
    //   return value;
    // }));

    return this.db.list('/products').snapshotChanges().pipe(map((value) => value as AppProductState[]));
  }

   getAllProducts(){
    return this.db.list('/products').valueChanges().pipe(map((data) => {
      console.log(data)
      return data as AppProduct[]
    }));
  }

  getProduct(id:string){
    return this.db.object("/products/"+id).valueChanges().pipe(map((data) => data as AppProduct))
  }

  update(productId:string,product:any){
    return this.db.object('/products/'+productId).update(product)
  }

  delete(productId:string){
    return this.db.object("/products/"+productId).remove()
  }

  
}
