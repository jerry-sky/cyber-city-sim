import { Component, OnInit, Input } from '@angular/core';
import { Cell } from '../../../../model/map';
import { MatDialog } from '@angular/material/dialog';
import { BuildingInfoPopupComponent } from '../building-info-popup/building-info-popup.component';
import { NewBuildingPopupComponent } from '../new-building-popup/new-building-popup.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  @Input() username: string;
  terrain: Cell[];
  userId = 1;
  scale = 1;

  constructor(private auth: AuthService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTerrain();
  }

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

  showBuildingInfo(cell: Cell, index: number): void {
    const data = {
      buildingName: `Building ${cell.buildingType + 1} on level ${
        cell.buildingLvl + 1
      }`,
      before: {
        red: Math.floor(Math.random() * 50),
        green: Math.floor(Math.random() * 50),
        blue: Math.floor(Math.random() * 50),
      },
      after: {
        red: Math.floor(Math.random() * 1000),
        green: Math.floor(Math.random() * 1000),
        blue: Math.floor(Math.random() * 1000),
      },
    };
    const dialogRef = this.dialog.open(BuildingInfoPopupComponent, {
      width: '800px',
      data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        alert(`Upgraded building`);
      }
      cell.buildingLvl++;
      this.terrain[index] = cell;
    });
  }

  showNewBuilding(cell: Cell, index: number): void {
    const data = {
      building1: {
        name: 'Building 1',
        red: Math.floor(Math.random() * 50),
        green: Math.floor(Math.random() * 50),
        blue: Math.floor(Math.random() * 50),
      },
      building2: {
        name: 'Building 2',
        red: Math.floor(Math.random() * 50),
        green: Math.floor(Math.random() * 50),
        blue: Math.floor(Math.random() * 50),
      },
      building3: {
        name: 'Building 3',
        red: Math.floor(Math.random() * 50),
        green: Math.floor(Math.random() * 50),
        blue: Math.floor(Math.random() * 50),
      },
    };
    const dialogRef = this.dialog.open(NewBuildingPopupComponent, {
      width: '800px',
      data,
    });
    dialogRef.afterClosed().subscribe((id) => {
      if (id + 1) {
        alert(`Bought building ${id + 1}`);
        cell.owner = this.userId;
        cell.buildingType = id;
        cell.buildingLvl = 0;
        this.terrain[index] = cell;
      }
    });
  }
}
