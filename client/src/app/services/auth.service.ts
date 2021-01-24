import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LoginRequest,
  RegisterRequest,
} from '../../../../model/server-requests';
import { BackendService } from '../services/backend.service';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private backend: BackendService, private usr: UserService) {}

  /**
   * Check if current user is logged in.
   */
  IsAuthenticated(): boolean {
    return this.usr.authenticated();
  }

  /**
   * Attempt logging in.
   */
  Login(username: string, password: string): Observable<boolean> {
    const payload: LoginRequest = {
      username,
      password,
    };
    // if everything went okay, then the response contains user’s data
    return this.backend.userLogin(payload).pipe(
      map((response) => {
        this.usr.create(response.user);
        return true;
      })
    );
  }

  /**
   * Remove login data from session.
   */
  Logout(): void {
    this.usr.remove();
  }

  /**
   * Attempt registering.
   */
  Register(
    username: string,
    email: string,
    password: string
  ): Observable<never> {
    const payload: RegisterRequest = {
      username,
      email,
      password,
    };
    return this.backend.userRegister(payload);
  }
}
