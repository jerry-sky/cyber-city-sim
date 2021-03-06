import { Component, OnInit, Input } from '@angular/core';
import { Cell, MAX_BUILDING_LEVEL } from '../../../../model/map';
import { MatDialog } from '@angular/material/dialog';
import { BuildingInfoPopupComponent } from '../building-info-popup/building-info-popup.component';
import { NewBuildingPopupComponent } from '../new-building-popup/new-building-popup.component';
import { ClaimCellPopupComponent } from '../claim-cell-popup/claim-cell-popup.component';
import { UpgradeCosts as BuildingsCosts } from '../../../../model/resource-production/upgrade-costs';
import { HourlyProduction as BuildingsValues } from '../../../../model/resource-production/hourly-production';
import { CityService } from '../services/city.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  @Input() username: string;
  terrain: Cell[] = [];
  neighbours: Cell[] = [];
  userId = -1;
  scale = 1;

  constructor(
    public dialog: MatDialog,
    private city: CityService,
    private usr: UserService
  ) {}

  ngOnInit(): void {
    this.usr.userDataSignal.subscribe((data) => {
      if (data != null) {
        this.userId = data.id;
      }
    });
    this.getTerrain();
  }

  /**
   * Retrive terrain from server, as an array of 400 cells
   */
  getTerrain(): void {
    this.terrain = [];
    this.city.GetMap().subscribe(
      (res) => {
        this.terrain = res.cells;
        this.checkNeighbours();
        this.focusCity();
      },
      (err) => {
        console.error('Error retriving city from server');
      }
    );
  }

  /**
   * Show all cells adjacent to user city
   */
  checkNeighbours(): void {
    const userCityIds = this.terrain
      .filter((c) => c.owner === this.userId)
      .map((c) => c.id);
    this.neighbours = this.terrain.filter((c) => {
      // is part of city
      if (userCityIds.includes(c.id)) {
        return false;
      }
      // other user owns it
      if (c.owner !== 0 && c.owner !== -1) {
        return false;
      }
      for (const i of userCityIds) {
        const row1 = Math.floor((i - 1) / 20);
        const row2 = Math.floor((c.id - 1) / 20);
        const col1 = (i - 1) % 20;
        const col2 = (c.id - 1) % 20;
        // horizontally
        if (row1 === row2 && Math.abs(col1 - col2) === 1) {
          return true;
        }
        // verrtically
        if (col1 === col2 && Math.abs(row1 - row2) === 1) {
          return true;
        }
      }
      return false;
    });
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
  chosenCell(targetId: string): void {
    const index = parseInt(targetId.replace('cell-', ''), 10);
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
      // adjecent empty cell
    } else if (this.neighbours.includes(cell)) {
      this.showCellBuying(cell, index);
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
        BuildingsCosts.default[ // I hate this
          `upgrade-building-${cell.buildingType}-to-lvl-${cell.buildingLvl + 1}` // I hate this even more
        ],
    };
    // check if it's possible to upgrade
    if (cell.buildingLvl < MAX_BUILDING_LEVEL) {
      // show dialog
      const dialogRef = this.dialog.open(BuildingInfoPopupComponent, {
        width: '800px',
        data,
      });
      // apply changes
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // send changes to server
          this.city.UpgradeBuilding(index + 1).subscribe(
            (res) => {
              alert(`Upgraded building`);
              cell.buildingLvl++;
              this.terrain[index] = cell;
              this.usr.reloadResources();
            },
            (err) => {
              alert(err.error.errorCode);
            }
          );
        }
      });
    } else {
      alert('Can’t upgrade, the building is already maxed out.');
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
        // send changes to server
        this.city.BuyBuilding(index + 1, id).subscribe(
          (res) => {
            alert(`Bought building ${id + 1}`);
            cell.owner = this.userId;
            cell.buildingType = id;
            cell.buildingLvl = 0;
            this.terrain[index] = cell;
            this.usr.addBuilding();
            this.usr.reloadResources();
          },
          (err) => {
            alert(err.error.errorCode);
          }
        );
      }
    });
  }

  /**
   * Show popup asking to buy cell
   *
   * @param cell the cell that was clicked
   * @param index index of cell in terrain array
   */
  showCellBuying(cell, index): void {
    // show dialog
    const dialogRef = this.dialog.open(ClaimCellPopupComponent, {
      width: '400px',
      data: cell.terrain,
    });
    // apply changes
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // send changes to server
        this.city.BuyCell(cell.id).subscribe(
          (res) => {
            alert(`Bought cell ${cell.id}`);
            cell.owner = this.userId;
            this.terrain[index] = cell;
            this.checkNeighbours();
            this.usr.addCell();
            this.usr.reloadResources();
          },
          (err) => {
            alert(err.error.errorCode);
          }
        );
      }
    });
  }
}
