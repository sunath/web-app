import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/compat/database'
import { User } from 'firebase/auth';
import { Observable,map } from 'rxjs';
import { AppUser } from '../Common/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db:AngularFireDatabase) {

   }

   save(user:User){
    this.db.object("/users/"+user.uid).update({
      name:user.displayName,
      email:user.email
    })
   }


   getUser(uid:string):Observable<AppUser>{
      return this.db.object("/users/"+uid).valueChanges().pipe(map( (user) => ( user as AppUser) ) )
   }
}
