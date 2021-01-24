import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CityService } from '../services/city.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss'],
})
export class CityDetailComponent implements OnInit {
  slots = 0;
  buildings = 0;
  production = {
    red: 0,
    green: 0,
    blue: 0,
  };
  resources = {
    red: 0,
    green: 0,
    blue: 0,
  };

  constructor(private usr: UserService) {}

  ngOnInit(): void {
    // user data
    this.usr.userDataSignal.subscribe((data) => {
      if (data != null) {
        this.slots = data.cells;
        this.buildings = data.buildings;
        this.production = data.production;
        this.resources = {
          red: data.redPCB,
          green: data.greenPCB,
          blue: data.bluePCB,
        };
      }
    });
  }
}
