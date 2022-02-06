import { Component, OnInit } from '@angular/core';
import AppProductState from "../../../Common/product-state";
import {CategoryService} from "../../../Services/category.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {


  categories:AppProductState[] = []

  constructor( private categoryService:CategoryService,private route:ActivatedRoute,private router:Router) {
    this.categoryService.getallcategoryId().subscribe(data => this.categories = data);
  }

  filterBy(key:string){
    this.router.navigate(["/products"],{relativeTo:this.route,queryParams:{category:key}})
  }

  ngOnInit(): void {
  }

}
