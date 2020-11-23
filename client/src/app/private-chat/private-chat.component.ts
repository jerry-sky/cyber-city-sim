import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LogoutPopupComponent } from '../logout-popup/logout-popup.component';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss'],
})
export class PrivateChatComponent implements OnInit {
  public username: string;
  // future: public messages: Message[]
  public messages: string[];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.messages = new Array(10);
    this.messages[0] = 'tHello';
    this.messages[1] = 'mHi';
    this.messages[2] = 'tI like your idea';
    this.messages[3] = `tIt\'s awesome`;
  }

  //method executed when sending private message to a user when clicking on submit <<new message form>> button on template
  sendPrivateMessage(message: NgForm) {
    console.log('sending message to private chat: ', message.value);
    this.messages.push('m' + message.value.mess);
  }

  logout(): void {
    this.dialog.open(LogoutPopupComponent, { width: '400px' });
  }
}
