import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from '../../../../model/message';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-global-chat',
  templateUrl: './global-chat.component.html',
  styleUrls: ['./global-chat.component.scss'],
})
export class GlobalChatComponent implements OnInit {
  username = 'benek';
  messages: Message[] = [];

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.GetGlobalMessages().subscribe(
      (res) => {
        this.messages = res;
      },
      (err) => {
        console.error('Error retrieving messages from server');
      }
    );
  }

  //send message to global chat
  sendGlobalMessage(message: NgForm) {
    this.auth.SendGlobalMessage(this.username, message.value);
  }
}
