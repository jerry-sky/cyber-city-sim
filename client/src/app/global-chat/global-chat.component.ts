import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-global-chat',
  templateUrl: './global-chat.component.html',
  styleUrls: ['./global-chat.component.scss']
})
export class GlobalChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sendGloablMessage(message: NgForm){
    console.log("sending message to global chat: ", message.value);
  }

}
