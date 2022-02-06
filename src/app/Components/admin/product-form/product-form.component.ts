import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseUniqueKey } from 'src/app/Common/firebaseuniquekey';
import AppProduct from 'src/app/Common/product';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product:AppProduct | any = {};

  categoriesId:FirebaseUniqueKey[]  = [];
  categories:Observable<any>;

  id:string = "";

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private categoryService:CategoryService,
    private productService:ProductsService) {
    this.categories = categoryService.getCategories();

    this.categoryService.getallcategoryId().subscribe(data => this.categoriesId = data)

    
    this.route.paramMap.subscribe(data => {
      const id = data.get("id")
      if(id){
        this.id = id;
        this.productService.getProduct(id).subscribe(data => this.product = data)
      }
    })

    this.categories.subscribe(data => console.log(data))

   }

  ngOnInit(): void {
  }

  save(f:any){

    if(this.id){
      this.productService.update(this.id,f)
    }else{
    this.productService.create(f);
    }
    this.router.navigate(['/admin/products'])
  }

  delete(){
    if( !(this.id && confirm("Are You sure") )) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products'])
  }

}
