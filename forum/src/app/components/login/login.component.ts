import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  constructor(private auth:AuthService, private router:Router, private userService:UserService){}
  loggedInUser?:firebase.default.User |null;
  user?:User|null;
  IsThereError=false;
  ngOnInit(): void {
    this.auth.isLoggedIn().subscribe((user) => {
      this.loggedInUser=user;
   });
  }
  onSubmit() {
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).then(cred=>{
       this.router.navigate(['admin'])
       this.IsThereError=false;
      }).catch(error=>{
        this.IsThereError=true
      })
    } 
 

  }

  faLock=faLock;
  loginForm=new FormGroup({
    email:new FormControl(''),
    password:new FormControl(''),
  });


}
