import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { FirebaseUniqueKey } from '../Common/firebaseuniquekey';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) { }


  getCategories(){
    return this.db.list('/categories',ref => ref.orderByChild('name')).valueChanges()
  }

  getallcategoryId(){
    return this.db.list('/categories').snapshotChanges().pipe(map((value) => value as FirebaseUniqueKey[]))
  }

}
