import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../../../../model/message';
import {
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

  SendGlobalMessage(message: string): Observable<never> {
    const payload: SendGlobalMessageRequest = {
      message,
    };
    return this.backend.sendGlobalMessage(payload);
  }

  GetGlobalMessages(): Observable<Message[]> {
    return this.backend
      .getGlobalMessages()
      .pipe(map((response) => response.messages));
  }

  GetUserChats(): Observable<string[]> {
    return this.backend
      .getUserChats()
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
    console.log(messageContent);
    return this.backend.sendPrivateMessage(payload);
  }
}
