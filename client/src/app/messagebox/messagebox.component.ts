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
  public userChats: string[];
  public username: string;

  constructor(
    public dialog: MatDialog,
    private chat: ChatService,
    private backend: BackendService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCurrentUsername();
    this.chat.GetUserChats(this.username).subscribe(
      (res) => {
        this.userChats = res;
      },
      (err) => {
        console.error('Error retrieving user chats from server');
      }
    );
  }

  getCurrentUsername(): void {
    this.backend.getCurrentUser().subscribe(
      (res) => {
        this.username = res.user.username;
      },
      (err) => {
        console.error('Error retrieving user data from server');
      }
    );
  }

  logout(): void {
    this.dialog.open(LogoutPopupComponent, { width: '400px' });
  }
}
