import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import AppProduct from 'src/app/Common/product';
import AppProductState from 'src/app/Common/product-state';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {


  products:AppProduct[] = [];
  productsStates:AppProductState[]  = []
  filteredProducts:AppProduct[] = []
  constructor(private productService:ProductsService){
  this.productService.getAllProducts().subscribe(data => {
    this.products = data;
    this.filteredProducts = this.products;
  })
  this.productService.getAllKeys().subscribe(data => {
    this.productsStates = data
   })
  }


  ngOnInit(): void {
  }


  filter(query:string){
      this.filteredProducts  = query ? this.products.filter(product => product.title.toLowerCase().includes(query.toLowerCase()))
      : this.products;
  }




}
