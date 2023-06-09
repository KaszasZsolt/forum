import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import {User} from '../../models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  constructor(private auth:AuthService, private router:Router,private userService:UserService){}

  ngOnInit(): void {
    
  }
  IsThereError=false;
  onSubmit() {
    
    const email = this.registerForm.get('email')?.value ;
    const password = this.registerForm.get('password')?.value;
    const confirmpassword = this.registerForm.get('confirmpassword')?.value ;
 
    if (email && password && confirmpassword==password) {
      this.auth.signup(email, password).then(cred=>
        {
          this.router.navigate(['admin'])
          const time=new Date()
          const user: User={
            id: cred.user?.uid as string,
            email:this.registerForm.get('email')?.value as string ,
            username:this.registerForm.get('email')?.value?.split('@')[0] as string,
            createDate:time.getTime(),
            accountType:'User'
          };
          this.userService.create(user).then(_ =>{
          }).catch(error=>{
            this.IsThereError=true
          })
          
        }).catch(error=>{
          this.IsThereError=true
        });
    }
    
  } 

  faLock=faLock;
  registerForm=new FormGroup({
    email:new FormControl(''),
    password:new FormControl(''),
    confirmpassword:new FormControl(''),

  });


}
