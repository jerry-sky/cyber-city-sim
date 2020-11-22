import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../../../model/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmitLogin(signInForm: NgForm): void {
    const name: string = signInForm.value.email.trim();
    const pass: string = signInForm.value.password.trim();

    if (!name || !pass) {
      alert('Login error: Input incorrect data.');
      return;
    }

    this.auth.Login(name, pass).subscribe(
      res => this.router.navigate(['/map']),
      err => alert('Login error: Incorrect login or password'),
      // () => this.router.navigate(['/map'])
    );
  }

  onSubmitRegister(signUpForm: NgForm): void {
    const username: string = signUpForm.value.username.trim();
    const email: string = signUpForm.value.email.trim();
    const pass1: string = signUpForm.value.password.trim();
    const pass2: string = signUpForm.value.password_repeated.trim();

    if (!username || !email || !pass1 || !pass2){
        alert('Register error: Input incorrect data.');
        return;
    }
    if (pass1 !== pass2){
      alert('Register error: Password should be equal.');
      return;
    }

    this.auth.Register(username, email, pass1).subscribe(
      res => alert('You can now log in'),
      err => alert('Login error: Incorrect login or password'),
      // () => alert('You can now log in')
    );
  }
}
