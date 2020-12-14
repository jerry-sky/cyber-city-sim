import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../../../../model/message';
import {
  LoginRequest,
  RegisterRequest,
  EditCellRequest,
  SendGlobalMessageRequest,
  GetMessageboxUsernamesRequest,
} from '../../../../model/server-requests';
import { LoginResponse, MapResponse, GlobalMessagesResponse, MessageboxUsernamesResponse } from '../../../../model/server-responses';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private usersUrl = environment.API + '/user';
  private mapUrl = environment.API + '/map';
  private cityUrl = environment.API + '/city';
  private globalChatUrl = environment.API + '/global-chat';
  private userChatsUrl = environment.API + '/user-chats';

  constructor(private http: HttpClient) {}

  public userLogin(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post(
      this.usersUrl + '/login',
      payload
    ) as Observable<LoginResponse>;
  }

  public userRegister(payload: RegisterRequest): Observable<never> {
    return this.http.post(
      this.usersUrl + '/register',
      payload
    ) as Observable<never>;
  }

  public getMap(): Observable<MapResponse> {
    return this.http.get(this.mapUrl) as Observable<MapResponse>;
  }

  public editCell(payload: EditCellRequest): Observable<never> {
    return this.http.post(this.mapUrl + '/cell', payload) as Observable<never>;
  }

  public sendGlobalMessage(payload: SendGlobalMessageRequest): Observable<never> {
    return this.http.post(
      this.globalChatUrl,
      payload
    ) as Observable<never>;
  }

  public getGlobalMessages(): Observable<GlobalMessagesResponse> {
    return this.http.get(this.globalChatUrl) as Observable<GlobalMessagesResponse>;
  }

  public getUserChats(payload: GetMessageboxUsernamesRequest): Observable<MessageboxUsernamesResponse> {
    return this.http.post(
      this.userChatsUrl,
      payload
    ) as unknown as Observable<MessageboxUsernamesResponse>;
  }
}
