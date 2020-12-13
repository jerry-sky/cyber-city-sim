import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-global-chat',
  templateUrl: './global-chat.component.html',
  styleUrls: ['./global-chat.component.scss'],
})
export class GlobalChatComponent implements OnInit {
  messages: string[] = ['message1', 'message2', 'message3'];

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.GetMap().subscribe(
      (res) => {
        this.getUserProduction(res.cells);
      },
      (err) => {
        console.error('Error retriving user data from server');
      }
    );
  }


  //send message to global chat
  sendGlobalMessage(message: NgForm) {
    console.log('sending message to global chat: ', message.value);
    this.messages.push(message.value.mess);
  }
}
