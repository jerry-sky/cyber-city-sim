import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { Cell } from '../../../../model/map'
import { MapResponse } from '../../../../model/server-responses'
import { MapService } from './map.service'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  providers: [MapService],
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  terrain : Cell[];
  curr_user : number = 1;
  test = true;
  scale = 1;

  constructor(
    private MapService: MapService,
    private router: Router
  ) { }

  ngOnInit(): void { 
    this.terrain = this.getTerrain();
    var grid = <HTMLElement>document.getElementsByClassName('allgrid')[0]
    grid.style.top  = `-${Math.floor(window.innerHeight*0.25)}px`;
    grid.style.left = `-${Math.floor(window.innerHeight*0.10)}px`;
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
    const grid = <HTMLElement>document.getElementsByClassName('allgrid')[0]
    const step = 15;
    // resize
    const mapSizes = grid.getBoundingClientRect()
    const s = mapSizes.width
    const newSize = (event.wheelDelta < 0 ? `${s - step}px` : `${s + step}px`)
    grid.style.width = newSize
    grid.style.height = newSize
    // transform
    const deltaX = Math.floor((event.clientX - mapSizes.x)/s * step)
    const deltaY = Math.floor((event.clientY - mapSizes.y)/s * step)
    const prevX = parseInt(grid.style.left.replace('px', ''))
    const prevY = parseInt(grid.style.top.replace('px', ''))
    grid.style.left = (event.wheelDelta < 0 ? `${(prevX + deltaX)}px` : `${(prevX - deltaX)}px`)
    grid.style.top = (event.wheelDelta < 0 ? `${(prevY + deltaY)}px` : `${(prevY - deltaY)}px`)
    // console.log(deltaY)
    // stop unnecessary next actions
    event.stopPropagation();
    event.preventDefault();
  }

  chosenCity(event): void {
    const id : number = parseInt(event.target.id.replace('user-', ''))
    console.log(id)
    if (id !== -1) {
      alert(`Clicked city of user ${id}`);
    }
  }

}
