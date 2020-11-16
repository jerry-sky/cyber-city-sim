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

    this.LoginService.login(name, pass).subscribe(
      res => this.router.navigate(['/map']),
      err => alert('Login error: Incorrect login or password'),
      // () => this.router.navigate(['/map'])
    );
  }

  onSubmitRegister(signUpForm: NgForm){
    let username : string = signUpForm.value.username.trim();
    let email : string = signUpForm.value.email.trim();
    let pass1 : string = signUpForm.value.password.trim();
    let pass2 : string = signUpForm.value.password_repeated.trim();

    if(!username || !email || !pass1 || !pass2){
        alert("Register error: Input incorrect data.");
        return;
    }
    if(pass1 != pass2){
      alert("Register error: Password should be equal.");
      return;
    }

    this.LoginService.register(username, email, pass1).subscribe(
      res => alert('You can now log in'),
      err => alert('Login error: Incorrect login or password'),
      // () => alert('You can now log in')
    );
  }
}
