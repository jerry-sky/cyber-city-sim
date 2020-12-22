import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../../../model/message';
import { BackendService } from '../services/backend.service';
import { ChatService } from '../services/chat.service';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';


@Component({
  selector: 'app-global-chat',
  templateUrl: './global-chat.component.html',
  styleUrls: ['./global-chat.component.scss'],
})
export class GlobalChatComponent implements OnInit, OnDestroy {
  private numbers = interval(1000);
  private alive: boolean;
  messages: Message[] = [];
  usernamesDictionary = [];

  constructor(
    private route: ActivatedRoute,
    private chat: ChatService,
    private backend: BackendService
  ) {}

  ngOnDestroy(): void {
    this.alive = false;
  }

  ngOnInit(): void {
    this.alive = true;
    this.getUsernamesDictionary();
    this.numbers
    .pipe(takeWhile(() => this.alive))
    .subscribe(() => this.loadGlobalMessages())
  }

  /**
   * Send message to global chat
   *
   * @param message the NgForm that contains the sent message
   */
  sendGlobalMessage(message: NgForm) {
    this.chat.SendGlobalMessage(message.value["mess"]).subscribe();
    message.reset();
  }

  getUsernamesDictionary() {
    this.backend.getUsernameDictionary().subscribe(
      (res) => {
        this.usernamesDictionary = res.users;
      },
      (err) => {
        console.error('Error retrieving usernames and userids dictionary')
      }
    )
  }

  getUsername(userId: number): string {
    for (const dic of this.usernamesDictionary) {
      console.log(dic);
      if (dic["id"] == userId) {
        return dic["username"];
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
