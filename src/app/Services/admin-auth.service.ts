import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable, switchMap,map } from 'rxjs';
import { AppUser } from '../Common/User';
import { AuthService } from './auth.service';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private auth:AuthService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.auth.appUser$.pipe(map((user) =>{
     if(user){
      return user.isAdmin
    }
    return false
  }
    )
    )
  }




}
