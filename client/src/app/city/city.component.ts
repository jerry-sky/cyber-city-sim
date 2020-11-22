import { Component, OnInit, Input } from '@angular/core';
import { CityCell } from '../../../../model/city';
import { MatDialog } from '@angular/material/dialog';
import { BuildingInfoPopupComponent } from '../building-info-popup/building-info-popup.component';
import { NewBuildingPopupComponent } from '../new-building-popup/new-building-popup.component';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  @Input() username: string;
  terrain: CityCell[];
  scale = 1;

  constructor(
    private auth: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getTerrain();
    const grid = document.getElementsByClassName('allgrid')[0] as HTMLElement;
    grid.style.top  = `0px`;
    grid.style.left = `0px`;
  }

  getTerrain(): void {
    this.terrain = []
    this.auth.GetCity(this.username).subscribe(
      res => this.terrain = res.cells,
      err => {
        console.error('Error retriving city from server');
        this.mockTerrain();     // TODO usunąć jak zostanie zrobione pobieranie z backendu
      }
    );
  }

  mockTerrain(): void {
    const cells: CityCell[] = [];
    for (let i = 0; i < 400; i++) {
        const c: CityCell = {
            owned: false,
            terrain: Math.floor(Math.random() * Math.floor(3)),
            buildingType: Math.floor(Math.random() * Math.floor(4)) - 1,
            buildingLvl: 0,
        };
        cells.push(c);
    }
    cells[30].owned = true;
    cells[31].owned = true;
    cells[48].owned = true;
    cells[49].owned = true;
    cells[50].owned = true;
    cells[51].owned = true;
    cells[68].owned = true;
    cells[69].owned = true;
    cells[70].owned = true;
    cells[88].owned = true;
    cells[89].owned = true;
    cells[90].owned = true;
    cells[109].owned = true;
    this.terrain = cells;
  }

  onScroll(event): void {
    const grid = document.getElementsByClassName('allgrid')[0] as HTMLElement;
    const step = 15;
    // resize
    const mapSizes = grid.getBoundingClientRect();
    const s = mapSizes.width;
    const newSize = (event.wheelDelta < 0 ? `${s - step}px` : `${s + step}px`);
    grid.style.width = newSize;
    grid.style.height = newSize;
    // transform
    const deltaX = Math.floor((event.clientX - mapSizes.x) / s * step);
    const deltaY = Math.floor((event.clientY - mapSizes.y) / s * step);
    const prevX = parseInt(grid.style.left.replace('px', ''), 10);
    const prevY = parseInt(grid.style.top.replace('px', ''), 10);
    grid.style.left = (event.wheelDelta < 0 ? `${(prevX + deltaX)}px` : `${(prevX - deltaX)}px`);
    grid.style.top = (event.wheelDelta < 0 ? `${(prevY + deltaY)}px` : `${(prevY - deltaY)}px`);
    // stop unnecessary next actions
    event.stopPropagation();
    event.preventDefault();
  }

  chosenCell(event): void {
    const index = parseInt(event.target.id.replace('cell-', ''), 10);
    const cell = this.terrain[index];
    // building exists
    if (cell.buildingType !== -1){
      this.showBuildingInfo(cell, index);
    }
    // empty slot
    else {
      this.showNewBuilding(cell, index);
    }
  }

  showBuildingInfo(cell: CityCell, index: number): void {
    const data = {
      buildingName: `Building ${cell.buildingType + 1} on level ${cell.buildingLvl + 1}`,
      before: {
        red: Math.floor(Math.random() * 50),
        green: Math.floor(Math.random() * 50),
        blue: Math.floor(Math.random() * 50)
      },
      after: {
        red: Math.floor(Math.random() * 1000),
        green: Math.floor(Math.random() * 1000),
        blue: Math.floor(Math.random() * 1000)
      }
    };
    const dialogRef = this.dialog.open(BuildingInfoPopupComponent, {
      width: '800px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        alert(`Upgraded building`);
      }
      cell.buildingLvl++;
      this.terrain[index] = cell;
    });
  }

  showNewBuilding(cell: CityCell, index: number): void {
    const data = {
      building1: {
        name: 'Building 1',
        red: Math.floor(Math.random() * 50),
        green: Math.floor(Math.random() * 50),
        blue: Math.floor(Math.random() * 50)
      },
      building2: {
        name: 'Building 2',
        red: Math.floor(Math.random() * 50),
        green: Math.floor(Math.random() * 50),
        blue: Math.floor(Math.random() * 50)
      },
      building3: {
        name: 'Building 3',
        red: Math.floor(Math.random() * 50),
        green: Math.floor(Math.random() * 50),
        blue: Math.floor(Math.random() * 50)
      }
    };
    const dialogRef = this.dialog.open(NewBuildingPopupComponent, {
      width: '800px',
      data: data
    });
    dialogRef.afterClosed().subscribe(id => {
      alert(`Bought building ${id + 1}`);
      cell.owned = true;
      cell.buildingType = id;
      cell.buildingId = Math.floor(Math.random() * 1000);
      this.terrain[index] = cell;
    });
  }

}