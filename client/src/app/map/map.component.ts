import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  terrain;

  constructor() { }

  ngOnInit(): void { 
    this.terrain = this.getTerrain();
    this.setCities();
  }

  getTerrain(): object[] {
    // map json object returned from server
    let tempTerain : object[] = [...Array(400)];
    for(let i=0; i<tempTerain.length; i++){
        tempTerain[i] = {
          'terrain': Math.floor(Math.random() * Math.floor(4)),
          'user_id': ((Math.random() > 0.9) ? 12 : "")
        }
    }
    return tempTerain;
  }

  setCities(): void {
    let cities = [];
    for(let i=0; i<this.terrain.length; i++){
      let uid = this.terrain[i].user_id
      if(uid != "" && !cities.includes(uid)){
        cities.push(uid)
      }
    }
    for(let id of cities){
      let rgbColor = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
      const cells = document.getElementsByClassName(`user-${id}`)
      console.log(cells)
      for(let c of cells){
        console.log(c);
      }
    }
  }

  onScroll(event): void {
    var grid = <HTMLElement>document.getElementsByClassName('allgrid')[0]
    let s = grid.getBoundingClientRect().width
    let newSize = (event.wheelDelta < 0 ? `${s-10}px` : `${s+10}px`)
    grid.style.width = newSize
    grid.style.height = newSize
  }

  chosenCity(event): void {
    let user_id = event.target.id.replace('user-', '')
    // city clicked of user_id
    if(user_id){
      console.log("hi")
      alert(`Clicked city of user ${user_id}`);
    }
  }

}
