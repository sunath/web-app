import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { filter, Observable } from 'rxjs';
import { AppUser } from 'src/app/Common/User';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';
import {ShoppingCartService} from "../../shopping-cart.service";
import {AppCartProduct} from "../../Common/app-cart-product";
import {AppCart} from "../../Common/app-cart";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  allItems:number = 0 ;
  public user:AppUser | undefined;
  appCart: AppCart ;


    constructor(public auth:AuthService,public userService:UserService,private shoppingCartService:ShoppingCartService) {
        auth.appUser$.subscribe(user => {
          if(user)
            this.user = user
          else
            this.user = undefined

        });
        this.appCart = new AppCart();
   }

  active = 1;

  async ngOnInit() {
  const cart = await this.shoppingCartService.getCart();
  cart.valueChanges().subscribe(v => {

    //@ts-ignore
    const items:AppCartProduct[] = v.filter(x => x.product)
      this.appCart = new AppCart(items);

  })

  }

  logout(){
    this.auth.logout();

  }

}
