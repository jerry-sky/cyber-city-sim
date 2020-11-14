import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitLogin(signInForm: NgForm){
    console.log("login", signInForm.value);
  }

  onSubmitRegister(signInForm: NgForm){
    console.log("register", signInForm.value);
  }
}
