import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import { GoogleAuthProvider, User, UserProfile } from 'firebase/auth';
import { map, Observable, of, switchMap } from 'rxjs';
import { AppUser } from '../Common/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$:Observable<User | any>

  constructor(
    private userService:UserService,
    private afAuth:AngularFireAuth,private router:ActivatedRoute) {
      this.user$ = afAuth.authState;

   }


   

   get appUser$():Observable<AppUser | null >{
    return this.user$.pipe(switchMap(
      (user:User) => {
       if(user) return this.userService.getUser(user.uid)
       return of(null)
        
      }
    ))
   }


  login(){
    localStorage.setItem("returnUrl",this.router.snapshot.queryParamMap.get("returnUrl") || "/")
    this.afAuth.signInWithRedirect(new GoogleAuthProvider());
  }

   logout(){
    this.afAuth.signOut();
   }

  
  
}
