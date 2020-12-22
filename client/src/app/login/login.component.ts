import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { User } from '../../../../model/user';
import { AuthService } from '../services/auth.service';

export interface DialogData {
  messages: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private regexp: RegExp;
  constructor(
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.regexp = new RegExp(/\S+@\S+\.\S+/);
  }

  onSubmitLogin(signInForm: NgForm): void {
    const name: string = signInForm.value.email.trim();
    const pass: string = signInForm.value.password.trim();
    let loginError = false;
    let errors: string[];

    if (!name || !pass) {
      this.openDialog(
        [
          'Login error: Username or password blank. Please insert your correct username/e-mail address and password.',
        ],
        loginError
      );
      loginError = false;
      return;
    }

    this.auth.Login(name, pass).subscribe(
      (res) => this.router.navigate(['/map']),
      (err) =>
        this.openDialog(['Login error: Incorrect login or password.'], true)
      // () => this.router.navigate(['/map'])
    );
  }

  onSubmitRegister(signUpForm: NgForm): void {
    const username: string = signUpForm.value.username.trim();
    const email: string = signUpForm.value.email.trim();
    const pass1: string = signUpForm.value.password.trim();
    const pass2: string = signUpForm.value.password_repeated.trim();
    let registerError = false;
    const errors = [];

    if (!username || !email || !pass1 || !pass2) {
      errors.push('Register error: No field should be empty.');
      registerError = true;
    }
    if (username.length < 5) {
      errors.push(
        'Register error: Username length should be at least 5 characters long.'
      );
      registerError = true;
    }

    if (pass1 !== pass2) {
      errors.push('Register error: Passwords should be equal.');
      registerError = true;
    }
    if (pass1.length < 8 || pass2.length < 8) {
      errors.push(
        'Register error: Password must be at least 8 characters long.'
      );
      registerError = true;
    }
    if (!this.regexp.test(email)) {
      errors.push('Register error: E-mail address incorrect.');
      registerError = true;
    }
    if (registerError) {
      this.openDialog(errors, registerError);
      registerError = false;
      return;
    }
    this.auth.Register(username, email, pass1).subscribe(
      (res) => this.openDialog(['You can now log in!'], false),
      (err) =>
        this.openDialog(['Login error: Incorrect login or password.'], true)
    );
  }

  openDialog(errorMsgs: string[], error: boolean): void {
    let errMsg = '';
    for (const errorMsg of errorMsgs) {
      errMsg += errorMsg + '\n';
    }
    if (error) {
      this.dialog.open(ErrorDialogComponent, {
        data: {
          messages: errMsg,
        },
      });
    } else {
      this.dialog.open(SuccessDialogComponent, {
        data: {
          messages: errMsg,
        },
      });
    }
  }
}

@Component({
  selector: 'app-error-dialog',
  templateUrl: 'error-dialog.html',
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}

@Component({
  selector: 'app-success-dialog',
  templateUrl: 'success-dialog.html',
})
export class SuccessDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
