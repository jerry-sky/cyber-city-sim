import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, RegisterRequest } from '../../../../model/server-requests';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usersUrl = 'http://localhost:3000/user'

  constructor(private http: HttpClient) { }

  
  login(name, pass): Observable<Object> {
    let user = {
      username: name, 
      password: pass
    } as LoginRequest
    return this.http.post(this.usersUrl + '/login', user);
  }
  
  register(name, email, pass): Observable<Object> {
    let user = {
      username: name,
      email: email, 
      password: pass
    } as RegisterRequest
    return this.http.post(this.usersUrl + '/register', user);
  }
}
