import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  constructor(private auth:AuthService, private router:Router){}

  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['admin']);
    }
  }
  onSubmit() {
    console.log("regi")
  } 

  faLock=faLock;
  registerForm=new FormGroup({
    email:new FormControl(''),
    password:new FormControl(''),
    confirmpassword:new FormControl(''),

  });


}
