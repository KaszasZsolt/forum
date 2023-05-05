import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  constructor(private auth:AuthService,private router:Router, private userService:UserService){

  }
  loggedInUser?:firebase.default.User |null;
  usersObject?:Array<User>| undefined;

  ngOnInit(): void {
    this.auth.isLoggedIn().subscribe((user) => {
      this.loggedInUser=user;
   });
   this.userService.loadUsersMeta().subscribe((data: Array<User>) => {
    this.usersObject=data;
    });
  }
  logout():void{
    this.auth.logout().then(()=>{
      this.router.navigate(['login'])
      console.log('logged out succesfully!');
    }).catch(error=>{
      
    });
  }
  userName(){
    if(this.loggedInUser?.uid){
      const user = this.usersObject?.find(user => user.id === this.loggedInUser?.uid);
        if (user?.username) {
          return user?.username;
        }
      }
      return '';
  }

}
