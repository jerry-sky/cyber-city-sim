import { Component, OnInit, Input } from '@angular/core';
import { Cell } from '../../../../model/map';
import { MatDialog } from '@angular/material/dialog';
import { BuildingInfoPopupComponent } from '../building-info-popup/building-info-popup.component';
import { NewBuildingPopupComponent } from '../new-building-popup/new-building-popup.component';
import { AuthService } from '../services/auth.service';
import { UpgradeCosts as BuildingsCosts } from '../../../../model/resource-production/upgrade-costs';
import { HourlyProduction as BuildingsValues } from '../../../../model/resource-production/hourly-production';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  @Input() username: string;
  terrain: Cell[];
  userId = 0;
  scale = 1;

  constructor(
    private auth: AuthService,
    public dialog: MatDialog,
    private city: CityService
  ) {}

  ngOnInit(): void {
    this.userId = this.auth.UserData.value ? this.auth.UserData.value.id : 0;
    this.getTerrain();
  }

  /**
   * Retrive terrain from server, as an array of 400 cells
   */
  getTerrain(): void {
    this.terrain = [];
    this.auth.GetMap().subscribe(
      (res) => {
        this.terrain = res.cells;
        this.focusCity();
      },
      (err) => {
        console.error('Error retriving city from server');
      }
    );
  }

  /**
   * Move and scroll city map, to be more or less in the center of visible part of map
   */
  focusCity(): void {
    const grid = document.getElementsByClassName('allgrid')[0] as HTMLElement;
    let firstCellIndex = 0;
    for (const c of this.terrain) {
      if (c.owner === this.userId) {
        firstCellIndex = this.terrain.indexOf(c);
        break;
      }
    }
    const firstCellX = (firstCellIndex % 20) / 20; // city to map ratio on X axis
    const firstCellY = Math.floor(firstCellIndex / 20) / 20; // city to map ratio on Y axis
    grid.style.top = `${Math.floor(
      -window.innerHeight * 1.5 * firstCellY + 0.25 * window.innerHeight
    )}px`;
    grid.style.left = `${Math.floor(
      -window.innerHeight * 1.5 * firstCellX + 0.5 * window.innerHeight
    )}px`;
  }

  /**
   * Change size of city map using scroll on mouse
   *
   * @param event mouse wheel event
   */
  onScroll(event): void {
    const grid = document.getElementsByClassName('allgrid')[0] as HTMLElement;
    const step = 15;
    // resize
    const mapSizes = grid.getBoundingClientRect();
    const s = mapSizes.width;
    const newSize = event.wheelDelta < 0 ? `${s - step}px` : `${s + step}px`;
    grid.style.width = newSize;
    grid.style.height = newSize;
    // transform
    const deltaX = Math.floor(((event.clientX - mapSizes.x) / s) * step);
    const deltaY = Math.floor(((event.clientY - mapSizes.y) / s) * step);
    const prevX = parseInt(grid.style.left.replace('px', ''), 10);
    const prevY = parseInt(grid.style.top.replace('px', ''), 10);
    grid.style.left =
      event.wheelDelta < 0 ? `${prevX + deltaX}px` : `${prevX - deltaX}px`;
    grid.style.top =
      event.wheelDelta < 0 ? `${prevY + deltaY}px` : `${prevY - deltaY}px`;
    // stop unnecessary next actions
    event.stopPropagation();
    event.preventDefault();
  }

  /**
   * Decide what popup to show after clicking on a cell
   *
   * @param event onclick event
   */
  chosenCell(event): void {
    const index = parseInt(event.target.id.replace('cell-', ''), 10);
    const cell = this.terrain[index];
    if (cell.owner === this.userId) {
      // building exists
      if (cell.buildingType !== -1) {
        this.showBuildingInfo(cell, index);
      }
      // empty slot
      else {
        this.showNewBuilding(cell, index);
      }
    }
  }

  /**
   * Show popup with current building production, as well as upgrade option
   *
   * @param cell the cell that was clicked
   * @param index index of cell in terrain array
   */
  showBuildingInfo(cell: Cell, index: number): void {
    // data object for popup, reading from hourly-production-values.json and upgrade-costs-values.json
    const data = {
      buildingName: `Building ${cell.buildingType + 1} on level ${
        cell.buildingLvl + 1
      }`,
      // curr hourly production
      before:
        BuildingsValues.default[
          `building-${cell.buildingType}-lvl-${cell.buildingLvl}`
        ],
      // hourly production after upgrade
      after:
        BuildingsValues.default[
          `building-${cell.buildingType}-lvl-${cell.buildingLvl + 1}`
        ],
      // cost of upgrade
      cost:
        BuildingsCosts.default[
          `upgrade-building-${cell.buildingType}-to-lvl-${cell.buildingLvl + 1}`
        ],
    };
    // check if it's possile to upgrade
    if (cell.buildingLvl < 2) {
      // show dialog
      const dialogRef = this.dialog.open(BuildingInfoPopupComponent, {
        width: '800px',
        data,
      });
      // apply changes
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          alert(`Upgraded building`);
        }
        cell.buildingLvl++;
        this.terrain[index] = cell;
        // send changes to server
        this.city.UpgradeBuilding(index + 1);
      });
    } else {
      alert('Cant upgrade, Building is already maxed out.');
    }
  }

  /**
   * Show popup with possible new building for choosen spot
   *
   * @param cell the cell that was clicked
   * @param index index of cell in terrain array
   */
  showNewBuilding(cell: Cell, index: number): void {
    // data object for popup, reading from hourly-production-values.json and upgrade-costs-values.json
    const data = {
      building1: {
        name: 'Building 1',
        production: BuildingsValues.default['building-0-lvl-0'], // possible hourly production
        cost: BuildingsCosts.default['buy-building-0'], // cost
      },
      building2: {
        name: 'Building 2',
        production: BuildingsValues.default['building-1-lvl-0'], // possible hourly production
        cost: BuildingsCosts.default['buy-building-1'], // cost
      },
      building3: {
        name: 'Building 3',
        production: BuildingsValues.default['building-2-lvl-0'], // possible hourly production
        cost: BuildingsCosts.default['buy-building-2'], // cost
      },
    };
    // show dialog
    const dialogRef = this.dialog.open(NewBuildingPopupComponent, {
      width: '800px',
      data,
    });
    // apply changes
    dialogRef.afterClosed().subscribe((id) => {
      if (id + 1) {
        alert(`Bought building ${id + 1}`);
        cell.owner = this.userId;
        cell.buildingType = id;
        cell.buildingLvl = 0;
        this.terrain[index] = cell;
        // send changes to server
        this.city.BuyBuilding(index + 1, id);
      }
    });
  }
}
