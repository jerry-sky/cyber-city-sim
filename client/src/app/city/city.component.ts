import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  // primitive mock 
  buildings: object[]

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.buildings = this.getBuildings();
  }

  //primitive mock
  getBuildings(): object[] {
    let tempBuildings : object[] = [...Array(4)];
    for(let i=0; i<4; i++){
      tempBuildings[i] = {
        'exists': i%2
      }
    }
    return tempBuildings;
  }

  chooseBuilding(event): void {
    // city clicked of user_id
    //TODO: <app-city-detail> component in dialog
    //alert(`Current production: `);
    this.dialog.open(CityDetailDialog);
  }

}

@Component({
  selector: 'app-city-detail',
  templateUrl: '../city-detail/city-detail.component.html',
  styleUrls: ['../city-detail/city-detail.component.scss'],
})
export class CityDetailDialog {}