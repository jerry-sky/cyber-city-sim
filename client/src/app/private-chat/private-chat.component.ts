import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss']
})
export class PrivateChatComponent implements OnInit {

  public username: string;
  // future: public messages: Message[]
  public messages: string[];
  constructor() { }

  ngOnInit(): void {
    this.messages = new Array(10);
    this.messages[0] = "tHello";
    this.messages[1] = "mHi";
    this.messages[2] = "tI like your idea";
    this.messages[3] = "tIt's awesome";
  }

  sendPrivateMessage(message: NgForm){
    console.log("sending message to private chat: ", message.value);
  }
}