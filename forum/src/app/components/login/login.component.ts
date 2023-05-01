import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  constructor(private auth:AuthService, private router:Router){}

  ngOnInit(): void {
    
  }
  onSubmit() {
    console.log(this.loginForm.value)
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).then(cred=>{
        this.router.navigate(['admin'])
        console.log(cred)
      }).catch(error=>{
        console.log(error)
      })
    } 
   /* if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe(
        (result)=>{
          this.router.navigate(['admin'])
        },
        (err: Error)=>{
          alert(err.message);
        }
      )
    }*/

  }

  faLock=faLock;
  loginForm=new FormGroup({
    email:new FormControl(''),
    password:new FormControl(''),
  });


}
