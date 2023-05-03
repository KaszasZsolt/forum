import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { Topic } from 'src/app/models/Topic';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private topicService:TopicService,private messageService:MessageService, private auth:AuthService){}

  loggedInUser?:firebase.default.User |null;
  activeTopic: Topic | undefined;
  topicId:String| undefined;
  messageObject?:Array<Message>| undefined;
  topicObject?: Array<Topic>

  ngOnInit(): void {
    this.topicService.loadTopicsMeta().subscribe((data: Array<Topic>) => {
   
      this.topicObject=data;
    })
    if(this.activeTopic){
      this.messageService.read(this.activeTopic).subscribe((data: Array<Message>) => {
        console.log(data);
        this.messageObject=data;
      })
    }
 
    this.auth.isLoggedIn().subscribe((user) => {
       this.loggedInUser=user;
    });
  }

  sendmessage(message: string): void{
    const user=this.auth.isLoggedIn()
    if(user) {   
      const messagemodel: Message={
        id:'',
        topicId:this.activeTopic?.id,
        userId: this.loggedInUser?.uid,
        createDate:new Date(),
        content:message
      };
      this.messageService.create(messagemodel)
    }
  }
  
  sendtopic(message: string,name:string): void{
    const user=this.auth.isLoggedIn()
    if(user) {   
      const topic: Topic={
        id: '',
        topicName:name,
        createDate:new Date(),
        content:message,
        userId:this.loggedInUser?.uid,
      };
    this.topicService.create(topic);

    } 
  }
  onSelect(topic: Topic): void {
    this.activeTopic=topic;
    this.topicId=topic.id;
    console.log('kavics a császár', topic.id)

    this.ngOnInit()
    console.log(JSON.stringify(this.messageObject));
  }
  visszatopic():void {
    this.topicId=''
    this.messageObject=undefined;
  }

}
