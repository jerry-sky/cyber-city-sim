import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, RegisterRequest, GetCityRequest } from '../../../../model/server-requests';
import { LoginResponse, MapResponse, GetCityResponse } from '../../../../model/server-responses';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private usersUrl = environment.API + '/user';
  private mapUrl = environment.API + '/map';
  private cityUrl = environment.API + '/city';

  constructor(private http: HttpClient) { }

  public userLogin(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post(this.usersUrl + '/login', payload) as Observable<LoginResponse>;
  }

  public userRegister(payload: RegisterRequest): Observable<never> {
    return this.http.post(this.usersUrl + '/register', payload) as Observable<never>;
  }

  public getMap(): Observable<MapResponse> {
    return this.http.get(this.mapUrl) as Observable<MapResponse>;
  }

  public getCity(payload: GetCityRequest): Observable<GetCityResponse> {
    return this.http.post(this.cityUrl, payload) as Observable<GetCityResponse>;
  }

}
