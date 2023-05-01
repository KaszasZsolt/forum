import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Message } from '../models/Message';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  collectionName='Messages';
  constructor( private afs:AngularFirestore) { }

  create(message:Message){
    return this.afs.collection<Message>(this.collectionName).doc(message.id).set(message);
  }
  read(){

  }
  update(){

  }
  delete(){

  }
}
