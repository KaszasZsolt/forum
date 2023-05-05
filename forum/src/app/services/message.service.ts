import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Message } from '../models/Message';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { Topic } from '../models/Topic';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  collectionName='Messages';
  constructor( private afs:AngularFirestore) { }

  loadMessageMeta(): Observable<Array<Message>> {
    return this.afs.collection<Message>(this.collectionName).valueChanges();
  }

  create(message:Message){
    message.id=this.afs.createId();
    return this.afs.collection<Message>(this.collectionName).doc(message.id).set(message);
  }

  read(topic: Topic){
    return this.afs.collection<Message>(this.collectionName, ref => ref.where('topicId', '==',topic.id)).valueChanges();
  }

  update(message:Message){
    return this.afs.collection<Message>(this.collectionName).doc(message.id).set(message);
  }
  delete(id:string){
    return this.afs.collection<Message>(this.collectionName).doc(id).delete();
  }
}
