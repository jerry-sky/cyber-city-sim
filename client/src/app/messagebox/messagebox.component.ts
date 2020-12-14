import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { LogoutPopupComponent } from '../logout-popup/logout-popup.component';
import { AuthService } from '../services/auth.service';

import { UserChat } from '../../../../model/user_chat';


@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.scss'],
})
export class MessageboxComponent implements OnInit {
  public user_chats: string[];
  public username: string;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    this.getUsername();
    this.auth.GetUserChats(this.username).subscribe(
      (res) => {
        this.user_chats = res;
      },
      (err) => {
        console.error('Error retrieving user chats from server');
      }
    );
  }

  getUsername(): void {
    this.route.params.subscribe((params) => {
      this.username = params.username;
    });
  }

  logout(): void {
    this.dialog.open(LogoutPopupComponent, { width: '400px' });
  }
}
