import { Component, OnInit } from '@angular/core';
import { Cell } from '../../../../model/map';
import { AuthService } from '../services/auth.service';
import { HourlyProduction as BuildingsValues } from '../../../../model/resource-production/hourly-production';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss'],
})
export class CityDetailComponent implements OnInit {
  userId = 1;
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

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.GetMap().subscribe(
      (res) => {
        this.getUserProduction(res.cells);
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
          this.production.red += c.terrain === 0 ? 2 * values.red : values.red;
          this.production.green +=
            c.terrain === 1 ? 2 * values.green : values.green;
          this.production.blue +=
            c.terrain === 2 ? 2 * values.blue : values.blue;
        }
      }
    });
  }
}
