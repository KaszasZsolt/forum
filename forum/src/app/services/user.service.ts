import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { User } from '../models/User';
import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  collectionName ='Users';

  constructor( private afs:AngularFirestore) { }

  create(user:User){
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }
  read(){

  }
  update(){

  }
  delete(){

  }
}
