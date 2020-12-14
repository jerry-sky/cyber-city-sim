import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { MatDialog } from '@angular/material/dialog';
import { LogoutPopupComponent } from '../logout-popup/logout-popup.component';
import { BackendService } from '../services/backend.service';
import { User } from '../../../../model/user';
import { Message } from '../../../../model/message';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss'],
})
export class PrivateChatComponent implements OnInit {
  public user: User;
  public chatUsername: string;
  public messages: Message[];

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private chat: ChatService,
    private backend: BackendService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.getChatUsername();
    this.getMessages();
  }

  getCurrentUser(): void {
    this.backend.getCurrentUser().subscribe(
      (res) => {
        this.user = res.user;
      },
      (err) => {
        console.error('Error retrieving user data from server');
      }
    );
  }

  getChatUsername(): void {
    this.route.params.subscribe((params) => {
      this.chatUsername = params.username;
    });
  }

  getMessages(): void {
    this.chat.GetPrivateMessages(this.chatUsername).subscribe(
      (res) => {
        this.messages = res;
      },
      (err) => {
        console.error('Error retrieving user data from server');
      }
    );
  }

  /**
   * Send message to the private chat with the user with username "chatUsername"
   *
   * @param message the NgForm that contains the sent message
   */
  sendPrivateMessage(message: NgForm) {
    this.chat.SendPrivateMessage(this.chatUsername, message.value);
    message.reset();
  }

  logout(): void {
    this.dialog.open(LogoutPopupComponent, { width: '400px' });
  }

  /**
   * Return string needed for css class, based on whether the message author is
   * the current user or their chatting partner.
   *
   * @param id the message author's id
   */
  isCurrentUser(id: number): string {
    if (id === this.user.id) {
      return 'm';
    } else {
      return 't';
    }
  }
}
