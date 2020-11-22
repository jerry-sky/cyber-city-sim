import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest, RegisterRequest, GetCityRequest } from '../../../../model/server-requests';
import { User } from '../../../../model/user';
import { Map } from '../../../../model/map';
import { City } from '../../../../model/city';
import { BackendService } from '../services/backend.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Data of the user (if logged in).
   */
  public UserData: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private backend: BackendService) {}

  IsAuthenticated(): boolean {
    return this.UserData.getValue() !== null;
  }

  /**
   * Attempt logging in.
   */
  Login(username: string, password: string): Observable<boolean> {
    const payload: LoginRequest = {
      username,
      password
    };
    // if everything went okay, then the response contains user’s data
    return this.backend.userLogin(payload).pipe(
      map((response) => {
        this.UserData.next(response.user);
        return true;
      })
    );
  }

  /**
   * Attempt registering.
   */
  Register(username: string, email: string, password: string): Observable<never> {
    const payload: RegisterRequest = {
      username,
      email,
      password
    };
    return this.backend.userRegister(payload);
  }

  /**
   * Get map configuration.
   */
  GetMap(): Observable<Map> {
    // if everything went okay, then the response contains map's data
    return this.backend.getMap().pipe(
      map((response) => {
        return response.map;
      })
    );
  }

  /**
   * Get city configuration.
   */
  GetCity(username: string): Observable<City> {
    const payload: GetCityRequest = {
      username
    };
    // if everything went okay, then the response contains map's data
    return this.backend.getCity(payload).pipe(
      map((response) => {
        return response.city;
      })
    );
  }

}
