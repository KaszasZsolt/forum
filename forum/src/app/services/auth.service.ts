import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router,private auth: AngularFireAuth) {}

 

  isLoggedIn() {
      return  this.auth.user;
  }

  logout() {
    return this.auth.signOut();
  }


  login({ email, password }: any){
    return this.auth.signInWithEmailAndPassword(email,password)
  }

  signup(email:string, password:string){
    return this.auth.createUserWithEmailAndPassword(email,password)
  }

}