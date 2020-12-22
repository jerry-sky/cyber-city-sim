import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { LogoutPopupComponent } from '../logout-popup/logout-popup.component';
import { AuthService } from '../services/auth.service';

import { UserChat } from '../../../../model/user-chat';
import { ChatService } from '../services/chat.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.scss'],
})
export class MessageboxComponent implements OnInit {
  public username: string;
  public userChats: string[];

  constructor(
    public dialog: MatDialog,
    private chat: ChatService,
    private backend: BackendService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.username = this.auth.UserData.value.username;
    this.chat.GetUserChats().subscribe(
      (res) => {
        this.userChats = res;
      },
      (err) => {
        console.error('Error retrieving user chats from server');
      }
    );
  }

  logout(): void {
    this.dialog.open(LogoutPopupComponent, { width: '400px' });
  }
}
