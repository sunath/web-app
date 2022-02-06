import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import AppProduct from 'src/app/Common/product';
import AppProductState from 'src/app/Common/product-state';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductsService } from 'src/app/Services/products.service';

import sorter from "../../Common/product-shorter"
import {ShoppingCartService} from "../../shopping-cart.service";
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {





  products:AppProduct[] = []
  filteredCategories:AppProduct[] = []
  shoppingCart:any;
  // private sub:Subscription;

  private isInit:boolean = false;




  constructor(

      private route:ActivatedRoute,
      private router:Router,
      private productService:ProductsService,
      private shoppingCartService:ShoppingCartService
    ) {


        this.productService.getAllProducts().subscribe({
          next:data =>{
            this.products = data.sort(sorter)

              const query =  this.route.snapshot.queryParamMap.get("category");
              if(!query){
                this.filteredCategories = this.products;
              }else{
                this.filteredCategories = this.products.filter(e => e.category == query)
              }
              }

        })

        this.route.queryParamMap.subscribe(data => {
           const query =  data.get("category");
           if(!query){
            this.filteredCategories = this.products;
           }else{
             this.filteredCategories = this.products.filter(e => e.category == query)
           }
        })
   }
  ngOnDestroy(): void {
    // this.sub.unsubscribe()

  }



 async ngOnInit() {

    const query =  this.route.snapshot.queryParamMap.get("category");
           if(!query){
            this.filteredCategories = this.products;
           }else{
             this.filteredCategories = this.products.filter(e => e.category == query)
           }
      const cart = await this.shoppingCartService.getCart()

         cart.valueChanges().subscribe(data => this.shoppingCart = data)
  }

}
