import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private router:Router,private auth:AuthService){

  }
  loggedInUser?:firebase.default.User |null;
  ngOnInit(): void {
    this.auth.isLoggedIn().subscribe(user=>{
      
      this.loggedInUser=user;
      localStorage.setItem('user',JSON.stringify(this.loggedInUser));
      console.log(user)
    },error =>{
      console.log(error)
      localStorage.setItem('user',JSON.stringify('null'));
    })
  }
  
 

[x: string]: any;
  title = 'forum';
}
