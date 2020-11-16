import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../../../model/user';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [LoginService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private LoginService: LoginService,
    private router: Router) { }

  users : User[];

  ngOnInit(): void {
  }

  onSubmitLogin(signInForm: NgForm){
    let name : string = signInForm.value.email.trim();
    let pass : string = signInForm.value.password.trim();
    
    if (!name || !pass) {
      alert("Login error: Input incorrect data.");
      return;
    }

    console.log(name, pass)
    this.LoginService.getUsers().subscribe(users => {
      let logged = false;
      users.forEach(usr => {
        if((usr.email == name || usr.username == name) && usr.password == pass){
          logged = true
          this.router.navigate(['/map']);
        }
      });
      if(!logged){
        alert('Login error: Incorrect login or password');
      }
    });    
  }

  onSubmitRegister(signUpForm: NgForm){
    let username : string = signUpForm.value.username.trim();
    let email : string = signUpForm.value.email.trim();
    let pass1 : string = signUpForm.value.password.trim();
    let pass2 : string = signUpForm.value.password_repeated.trim();

    // if(!username || !email || !pass1 || !pass2){
    //     alert("Register error: Input incorrect data.");
    //     return;
    // }
    // if(pass1 != pass2){
    //   alert("Register error: Password should be equal.");
    //   return;
    // }

    let newUser : User = {
      username: username,
      password: pass1,
      email: email,
      activated: true,
      dateJoined: new Date
    } as User;

    this.LoginService.addUser(newUser);
  }
}
