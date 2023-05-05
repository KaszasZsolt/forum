import { Component, Input, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { Timestamp } from 'firebase/firestore';
import { Message } from 'src/app/models/Message';
import { Topic } from 'src/app/models/Topic';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private topicService:TopicService,private messageService:MessageService,private userService:UserService, private auth:AuthService){
    this.searchTerm = '';
    this.searchTermMessage='';
    this.topicId='';
   

  }

  loggedInUser?:firebase.default.User |null;
  activeTopic: Topic | undefined;
  topicId:String;
  messageObject?:Array<Message>| undefined;
  usersObject?:Array<User>| undefined;
  isEditMode = false;
  isEditMessageId=''
  topicObject?: Array<Topic>
  searchTerm: string;
  searchTermMessage:string;


  ngOnInit(): void {
    
    this.topicService.loadTopicsMeta().subscribe((data: Array<Topic>) => {
      this.topicObject = data.sort((a, b) => b.createDate - a.createDate);
    })
    if(this.activeTopic){
      this.messageService.read(this.activeTopic).subscribe((data: Array<Message>) => {
        this.messageObject = data.sort((a, b) => b.createDate - a.createDate);
      })
    }

    this.userService.loadUsersMeta().subscribe((data: Array<User>) => {
      this.usersObject=data;
    });

    this.auth.isLoggedIn().subscribe((user) => {
       this.loggedInUser=user;
    });
    
  }

  sendmessage(message: string): void{
    const user=this.auth.isLoggedIn()
    const time=new Date()
    if(user) {   
      const messagemodel: Message={
        id:'',
        topicId:this.activeTopic?.id,
        userId: this.loggedInUser?.uid,
        createDate:time.getTime(),
        content:message
      };
      this.messageService.create(messagemodel)
    }
  }
  
  sendtopic(message: string,name:string): void{
    const user=this.auth.isLoggedIn()
    const time=new Date()
    if(user) {   
      const topic: Topic={
        id: '',
        topicName:name,
        createDate:time.getTime(),
        content:message,
        userId:this.loggedInUser?.uid,
      };
    this.topicService.create(topic);

    } 
  }
  deleteTopic(): void{
    if(this.topicId){
      this.topicService.delete(this.topicId as string);
    }
  }
  deleteMessage(id:String): void{
      this.messageService.delete(id as string);
  }
  onSelect(topic: Topic): void {
    this.activeTopic=topic;
    this.topicId=topic.id;

    this.ngOnInit()
  }
  visszatopic():void {
    this.topicId=''
    this.messageObject=undefined;
  }

  getUserById(userid: string){
   
    const user = this.usersObject?.find(user => user.id === userid);
    if (user) {
      return user?.username as string;
    }
    else{
      return '';
    }
  }
  isAdminUser(userid: any){
   if(userid){
    const user = this.usersObject?.find(user => user.id === userid);
      if (user?.accountType=='admin') {
        return true;
      }
    }
    return false;
  }
  convertToDate(timestamp:number){
    var date = new Date(timestamp).toLocaleDateString("en-US")
   
    var time = new Date(timestamp).toLocaleTimeString("en-US")
   
    return date+' '+time;
  }
  udpateMessage(message:Message, content:string){
    message.content = content;
    this.messageService.update(message);
    this.isEditMode=false
  }
  udpateTopic(topic:Topic, topicname:string,content:string,){
    topic.content = content;
    topic.topicName = topicname;
    this.topicService.update(topic);
    this.isEditMode=false
  }
}
