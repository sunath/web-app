import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import FindPath from 'src/app/Common/voice-dector-decoder';
import { SpeechRecognizerService } from 'src/app/speech-recognizer.service';
import { textChangeRangeIsUnchanged } from 'typescript';
import AppProduct from "../../Common/product";
import {ProductsService} from "../../Services/products.service";
import FindUpdatableProduct from "../../Common/VoiceHelpers/voice-products-update";
import AppProductState from "../../Common/product-state";
import FindProductCategory from "../../Common/VoiceHelpers/voice-product-category";
import {CategoryService} from "../../Services/category.service";
import {map} from "rxjs";

declare const annyang: any;

@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.css']
})
export class VoiceComponent {


  private allProducts:AppProduct[] = []
  private productKeys:AppProductState[] = []
  private allCategories:string[] = []

  constructor(public voiceService:SpeechRecognizerService,private router:Router,private ngZone:NgZone,private productService:ProductsService,private  categoryService:CategoryService){
    this.voiceService.addResultListener(this.myListener.bind(this))
    this.productService.getAllProducts().subscribe(data => {
      this.allProducts = data
    }
    )
    this.productService.getAllKeys().subscribe(data => this.productKeys = data)
    this.categoryService.getallcategoryId().pipe(map((name) => name.map(e => e.key) )).subscribe(data => this.allCategories = data)
  }

  myListener(args:any){
      const route = FindPath(args)
      const product = FindUpdatableProduct(args,this.allProducts)

    const searchBy = FindProductCategory(args,this.allCategories)


  console.log(searchBy)
    console.log(product)


      this.ngZone.run(() => {

        if(searchBy.isCalled && searchBy.productName){
          this.router.navigate(["/products/"],{queryParams:{
              category:searchBy.productName
            }})
        }else
        if(product.isCalledUpdate){
          if (product.product) {
            const index = this.allProducts.indexOf(product.product)
            const key = this.productKeys[index]
            this.router.navigate(["/admin/products/"+key.key])
          }
        }
        else
        if( route){
          this.router.navigate([route.url])
        }
      })

  }

  endListening(){
    this.voiceService.closeVoiceRecognition();
  }

  startListening(){
    this.voiceService.startVoiceRecognition();
  }




}
