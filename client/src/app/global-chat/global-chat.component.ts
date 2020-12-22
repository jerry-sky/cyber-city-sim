import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../../../model/message';
import { BackendService } from '../services/backend.service';
import { ChatService } from '../services/chat.service';
import { interval, Observable, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-global-chat',
  templateUrl: './global-chat.component.html',
  styleUrls: ['./global-chat.component.scss'],
})
export class GlobalChatComponent implements OnInit, OnDestroy {
  public messages: Message[] = [];
  public usernamesDictionary = [];
  private numbers: Observable<number>;
  private alive: Subscription;

  constructor(
    private route: ActivatedRoute,
    private chat: ChatService,
    private backend: BackendService
  ) {}

  ngOnDestroy(): void {
    this.alive.unsubscribe();
  }

  ngOnInit(): void {
    this.getUsernamesDictionary();
    if (!this.numbers) {
      this.numbers = interval(1000);
    }
    this.alive = this.numbers.subscribe(() => {
      this.loadGlobalMessages();
    });
  }

  /**
   * Send message to global chat
   *
   * @param message the NgForm that contains the sent message
   */
  sendGlobalMessage(message: NgForm) {
    this.chat.SendGlobalMessage(message.value.mess).subscribe();
    message.reset();
  }

  getUsernamesDictionary() {
    this.backend.getUsernameDictionary().subscribe(
      (res) => {
        this.usernamesDictionary = res.users;
      },
      (err) => {
        console.error('Error retrieving usernames and userids dictionary');
      }
    );
  }

  getUsername(userId: number): string {
    for (const dic of this.usernamesDictionary) {
      if (dic.id === userId) {
        return dic.username;
      }
    }
  }

  loadGlobalMessages() {
    this.chat.GetGlobalMessages().subscribe(
      (res) => {
        this.messages = res;
      },
      (err) => {
        console.error('Error retrieving messages from server');
      }
    );
  }
}
