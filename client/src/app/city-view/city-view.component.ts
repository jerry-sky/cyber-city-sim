import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutPopupComponent } from '../logout-popup/logout-popup.component';


@Component({
  selector: 'app-city-view',
  templateUrl: './city-view.component.html',
  styleUrls: ['./city-view.component.scss']
})
export class CityViewComponent implements OnInit {
  username: string;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUsername();
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    });
  }

  getUsername(): void {
    const username = this.route.snapshot.paramMap.get('username');
    // primitive mock
    
    this.username = username
    /* in the future:
    this.someService.getUser(username)
      .subscribe(username => this.username = username);
    */
  }

  logout(): void {
    this.dialog.open(LogoutPopupComponent, {width: '400px'});
  }

}
