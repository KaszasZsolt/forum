import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { user } from '@angular/fire/auth';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  usersObject?:Array<User>| undefined;
  displayedColumns: string[] = ['id', 'username', 'email', 'createDate', 'accountType'];
  constructor(private userService:UserService,private auth:AuthService){}
  loggedInUser?:firebase.default.User |null;
  isEditMode = false;
  isEditUserId=''
  dataSource = new MatTableDataSource<any>([]);
  ngOnInit(): void {
    this.userService.loadUsersMeta().subscribe((data: Array<User>) => {
      this.usersObject=data;
    })
    this.auth.isLoggedIn().subscribe((user) => {
      this.loggedInUser=user;
   });
  
  }
  convertToDate(timestamp:number){
    var date = new Date(timestamp).toLocaleDateString("en-US")
   
    var time = new Date(timestamp).toLocaleTimeString("en-US")
   
    return date+' '+time;
  }
  
  deleteUser(id:String): void{
    this.userService.delete(id as string);
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

   udpateUser(user: User, email:string,nev:string ): void{
    if(email){
      user.email=email;
    }
    if (nev) {
      user.username=nev;
    }
    this.userService.update(user);
    this.isEditMode=false
   }
   toggle(user: User){
      if(user.accountType=='admin'){
        user.accountType='user'
      }
      else{
        user.accountType='admin'
      }
      this.userService.update(user);
   }
}
