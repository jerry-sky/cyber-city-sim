import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.scss']
})
export class MessageboxComponent implements OnInit {

  public players: string[];
  public username: string;

  constructor() { }

  ngOnInit(): void {
    //mock, to be: service.subscribe on players
    this.players = ['beno', 'janek', 'kacper'];
    this.username = "benek";
  }

}
