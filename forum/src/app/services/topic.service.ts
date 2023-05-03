import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Topic } from '../models/Topic';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  collectionName='Topics'
  constructor(private afs:AngularFirestore) { }

  loadTopicsMeta(): Observable<Array<Topic>> {
    return this.afs.collection<Topic>(this.collectionName).valueChanges();
  }

  create(topic:Topic){
    topic.id=this.afs.createId();
    return this.afs.collection<Topic>(this.collectionName).doc(topic.id).set(topic);
  }
  getAll(){
    return this.afs.collection<Topic>(this.collectionName).valueChanges();
  }
  update(){
    
  }
}
