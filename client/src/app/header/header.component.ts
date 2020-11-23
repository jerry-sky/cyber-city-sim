import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public inGameTime: Date;

  constructor() {}

  ngOnInit(): void {
    this.inGameTime = new Date('00:00 01/01/2170');
    window.setInterval(this.changeTime.bind(this), 1000);
  }

  changeTime(): void {
    this.inGameTime = new Date(this.inGameTime.getTime() + 60 * 1000); // 1 minute, each second
  }
}
