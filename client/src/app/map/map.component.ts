import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { Cell } from '../../../../model/map';
import { MapResponse } from '../../../../model/server-responses';
import { MapService } from './map.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfilePopupComponent } from '../profile-popup/profile-popup.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  providers: [MapService],
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  terrain: Cell[];
  currUser = 1;
  test = true;
  scale = 1;

  constructor(
    private MapService: MapService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.terrain = this.getTerrain();
    const grid = document.getElementsByClassName('allgrid')[0] as HTMLElement;
    grid.style.top  = `-${Math.floor(window.innerHeight * 0.25)}px`;
    grid.style.left = `-${Math.floor(window.innerHeight * 0.10)}px`;
  }

  getTerrain(): Cell[] {
    this.MapService.getTerrain().subscribe(
      res => {
        const m = res as MapResponse;
        this.terrain = m.map.cells;
      },
      err => console.error('Error retriving map from server')
    );
    return [];
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

  chosenCity(event): void {
    const id: number = parseInt(event.target.id.replace('user-', ''), 10);
    // temp data
    const data = {
      username: '',
      production: {
        red: Math.floor(Math.random() * 50),
        green: Math.floor(Math.random() * 50),
        blue: Math.floor(Math.random() * 50)
      },
      resources: {
        red: Math.floor(Math.random() * 1000),
        green: Math.floor(Math.random() * 1000),
        blue: Math.floor(Math.random() * 1000)
      }
    };
    if (id === this.currUser) {
      data.username = 'benek';
    } else {
      data.username = 'janek';
    }
    if (id !== -1) {
      if (id === this.currUser){
        this.router.navigate(['/city/benek']);
      } else {
        this.dialog.open(ProfilePopupComponent, {
          width: '800px',
          data: data,
        });
      }
    }
  }

}
