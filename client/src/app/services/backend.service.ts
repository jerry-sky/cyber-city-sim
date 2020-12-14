import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LoginRequest,
  RegisterRequest,
  EditCellRequest,
  UpgradeBuildingRequest,
  BuyBuildingRequest,
} from '../../../../model/server-requests';
import { LoginResponse, MapResponse } from '../../../../model/server-responses';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private usersUrl = environment.API + '/user';
  private mapUrl = environment.API + '/map';
  private cityUrl = environment.API + '/city';

  /**
   * Options to use when performing any HTTP requests.
   * The `withCredentials` option ensures that the session cookie is sent with every request.
   */
  private options = { withCredentials: true };

  constructor(private http: HttpClient) {}

  public userLogin(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post(
      this.usersUrl + '/login',
      payload,
      this.options
    ) as Observable<LoginResponse>;
  }

  public userRegister(payload: RegisterRequest): Observable<never> {
    return this.http.post(
      this.usersUrl + '/register',
      payload,
      this.options
    ) as Observable<never>;
  }

  public getMap(): Observable<MapResponse> {
    return this.http.get(this.mapUrl, this.options) as Observable<MapResponse>;
  }

  public upgradeBuilding(payload: UpgradeBuildingRequest): Observable<never> {
    return this.http.post(
      this.cityUrl + '/upgrade-building',
      payload,
      this.options
    ) as Observable<never>;
  }

  public buyBuilding(payload: BuyBuildingRequest): Observable<never> {
    return this.http.post(
      this.cityUrl + '/buy-building',
      payload,
      this.options
    ) as Observable<never>;
  }
}
