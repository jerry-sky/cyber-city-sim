import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {
  
  // primitive mock
  public username: string
  
  constructor() { }

  ngOnInit(): void {
    this.username = "benek"
  }

}
