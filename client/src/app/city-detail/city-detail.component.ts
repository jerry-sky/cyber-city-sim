import { Component, OnInit } from '@angular/core';
import { Cell } from '../../../../model/map';
import { AuthService } from '../services/auth.service';
import { HourlyProduction as BuildingsValues } from '../../../../model/resource-production/hourly-production';
import { ResourceInterval } from '../../../../model/terrain-type';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss'],
})
export class CityDetailComponent implements OnInit {
  userId = 0;
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

  constructor(private auth: AuthService, private city: CityService) {}

  ngOnInit(): void {
    // user data
    this.userId = this.auth.GetUserData().id;
    // user resources and production
    this.getAllData();
    // refreash signal
    this.city.refreashSignal.subscribe((data) => this.getAllData());
  }

  getAllData(): void {
    this.auth.GetMap().subscribe(
      (res) => {
        this.getUserProduction(res.cells);
        this.getUserResources();
        window.setInterval(
          this.incrementResources.bind(this),
          1000 * ResourceInterval
        );
      },
      (err) => {
        console.error('Error retriving user data from server');
      }
    );
  }

  getUserProduction(terrain: Cell[]) {
    terrain.forEach((c) => {
      if (c.owner === this.userId) {
        // count cells
        this.slots++;
        if (c.buildingType !== -1) {
          // count buildings
          this.buildings++;
          // count production
          const name = `building-${c.buildingType}-lvl-${c.buildingLvl}`;
          const values = BuildingsValues.default[name];
          this.production.red += values.red;
          this.production.green += values.green;
          this.production.blue += values.blue;
        }
      }
    });
  }

  getUserResources() {
    this.auth.GetUserResources(this.userId).subscribe(
      (res) => {
        this.resources.red = res.redPCB;
        this.resources.green = res.greenPCB;
        this.resources.blue = res.bluePCB;
      },
      (err) => console.log(err)
    );
  }

  incrementResources() {
    this.resources.red += this.production.red;
    this.resources.green += this.production.green;
    this.resources.blue += this.production.blue;
  }
}
