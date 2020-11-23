import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-global-chat',
  templateUrl: './global-chat.component.html',
  styleUrls: ['./global-chat.component.scss'],
})
export class GlobalChatComponent implements OnInit {
  messages: string[] = ['message1', 'message2', 'message3'];

  constructor() {}

  ngOnInit(): void {}

  //send message to global chat
  sendGlobalMessage(message: NgForm) {
    console.log('sending message to global chat: ', message.value);
    this.messages.push(message.value.mess);
  }
}
