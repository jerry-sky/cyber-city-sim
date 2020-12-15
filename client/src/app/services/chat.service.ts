import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../../../../model/message';
import {
  GetMessageboxUsernamesRequest,
  GetPrivateMessagesRequest,
  SendGlobalMessageRequest,
  SendPrivateMessageRequest,
} from '../../../../model/server-requests';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private backend: BackendService) {}

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

  GetPrivateMessages(username: string): Observable<Message[]> {
    const payload: GetPrivateMessagesRequest = {
      username,
    };
    return this.backend
      .getPrivateMessages(payload)
      .pipe(map((response) => response.messages));
  }

  SendPrivateMessage(
    username: string,
    messageContent: string
  ): Observable<never> {
    const payload: SendPrivateMessageRequest = {
      username,
      messageContent,
    };
    return this.backend.sendPrivateMessage(payload);
  }
}
