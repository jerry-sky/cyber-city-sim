import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutPopupComponent } from '../logout-popup/logout-popup.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements OnInit {
  // primitive mock
  public username: string;

  constructor(public dialog: MatDialog, private usr: UserService) {}

  ngOnInit(): void {
    this.usr.userDataSignal.subscribe((data) => {
      if (data != null) {
        this.username = data.username;
      } else {
        this.username = 'user';
      }
    });
  }

  logout(): void {
    this.dialog.open(LogoutPopupComponent, { width: '400px' });
  }
}
