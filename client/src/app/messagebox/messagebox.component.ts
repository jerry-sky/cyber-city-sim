import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutPopupComponent } from '../logout-popup/logout-popup.component';


@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.scss']
})
export class MessageboxComponent implements OnInit {

  public players: string[];
  public username: string;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    //mock, to be: service.subscribe on players
    this.players = ['beno', 'janek', 'kacper'];
    this.username = "benek";
  }

  logout(): void {
    this.dialog.open(LogoutPopupComponent, {width: '400px'});
  }

}
