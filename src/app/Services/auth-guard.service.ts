import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth:AuthService,private router:Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    let userState = new Subject<boolean>();

    this.auth.appUser$.subscribe(user => {
    
      if (user){
       return userState.next(true)
      }
      

      let url =  state.url || "/";
      console.log(url)

      this.router.navigate(["login"],{queryParams:{
        returnUrl:url
      }})
      return userState.next(false)
    })

     

    return userState.asObservable()

  }
}
