import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  LoginRequest,
  RegisterRequest,
  EditCellRequest,
  SendGlobalMessageRequest,
  GetMessageboxUsernamesRequest,
} from '../../../../model/server-requests';
import { User } from '../../../../model/user';
import { Map, Cell } from '../../../../model/map';
import { Message } from '../../../../model/message';
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
      password,
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
   * Edit cell data (owner, new building, level up, etc)
   * Possible categories:
   *    owner         (when buing/trading cells)
   *    buildingType  (when buing building)
   *    buildingLvl   (when upgrading building)
   */
  EditCell(
    cellId: number,
    changedCategory: string,
    changedValue: number
  ): Observable<never> {
    const payload: EditCellRequest = {
      cellId,
      changedCategory,
      changedValue,
    };
    return this.backend.editCell(payload);
  }

  SendGlobalMessage(username: string, message: string): Observable<never> {
    const payload: SendGlobalMessageRequest = {
      username,
      message,
    };
    return this.backend.sendGlobalMessage(payload);
  }

  GetGlobalMessages(): Observable<Message[]> {
    return this.backend
      .getGlobalMessages()
      .pipe(map((response) => response.messages));
  }

  GetUserChats(username: string): Observable<string[]> {
    const payload: GetMessageboxUsernamesRequest = {
      username,
    };
    return this.backend
      .getUserChats(payload)
      .pipe(map((response) => response.usernames));
  }
}
