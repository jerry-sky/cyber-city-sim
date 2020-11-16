import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatchError } from ''

import { User } from '../../../../model/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // Authorization: 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usersUrl = 'http://localhost:3000/users'

  constructor(private http: HttpClient) { }

  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }
  
  addUser(user: User): Observable<User> {
    console.log('posted2');
    return this.http.post<User>(this.usersUrl, user, httpOptions);
  }
}
