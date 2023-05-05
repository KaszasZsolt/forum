import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { User } from '../models/User';
import { user } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  collectionName ='Users';

  constructor( private afs:AngularFirestore) { }


  loadUsersMeta(): Observable<Array<User>> {
    return this.afs.collection<User>(this.collectionName).valueChanges();
  }

  create(user:User){
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }
  
  read(id:string){
    return this.afs.collection<User>(this.collectionName, ref => ref.where('id', '==',id)).valueChanges();
  }
  update(user:User){
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }
  delete(id:string){
    return this.afs.collection<User>(this.collectionName).doc(id).delete();
  }
}
