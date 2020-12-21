import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../../../model/message';
import { BackendService } from '../services/backend.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-global-chat',
  templateUrl: './global-chat.component.html',
  styleUrls: ['./global-chat.component.scss'],
})
export class GlobalChatComponent implements OnInit {
  messages: Message[] = [];

  constructor(
    private route: ActivatedRoute,
    private chat: ChatService,
    private backend: BackendService
  ) {}

  ngOnInit(): void {
    this.chat.GetGlobalMessages().subscribe(
      (res) => {
        this.messages = res;
      },
      (err) => {
        console.error('Error retrieving messages from server');
      }
    );
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


}
