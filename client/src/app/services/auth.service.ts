import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  LoginRequest,
  RegisterRequest,
  SimpleIdRequest,
} from '../../../../model/server-requests';
import { User } from '../../../../model/user';
import { Map } from '../../../../model/map';
import { BackendService } from '../services/backend.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Data of the user (if logged in).
   */
  public UserData: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );
  public UserLand: BehaviorSubject<number | null> = new BehaviorSubject<
    number | null
  >(null);

  constructor(private backend: BackendService) {}

  IsAuthenticated(): boolean {
    if (!this.UserData.getValue()) {
      return sessionStorage.getItem('user-data') !== null;
    } else {
      return false;
    }
  }

  GetUserData(): User {
    if (!this.UserData.getValue()) {
      return JSON.parse(sessionStorage.getItem('user-data')) as User;
    } else {
      return this.UserData.getValue();
    }
  }
  GetUserLand(): number {
    if (!this.UserLand.getValue()) {
      return parseInt(sessionStorage.getItem('user-land'), 10);
    } else {
      return this.UserLand.getValue();
    }
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
        this.UserData.next(response.user);
        sessionStorage.setItem('user-data', JSON.stringify(response.user));
        this.UserLand.next(response.land);
        sessionStorage.setItem('user-land', response.land.toString());
        return true;
      })
    );
  }

  /**
   * Remove login data from session.
   */
  Logout(): void {
    sessionStorage.setItem('user-data', null);
    sessionStorage.setItem('user-land', null);
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

  /**
   * Get map configuration.
   */
  GetMap(): Observable<Map> {
    // if everything went okay, then the response contains map's data
    return this.backend.getMap().pipe(map((response) => response.map));
  }

  /**
   * Get user resources.
   */
  GetUserResources(userId: number): Observable<User> {
    // if everything went okay, then the response contains map's data
    const payload: SimpleIdRequest = {
      userId,
    };
    return this.backend
      .getUserResources(payload)
      .pipe(map((response) => response.user || null));
  }
}
