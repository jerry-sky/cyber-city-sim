import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-tradehouse',
  templateUrl: './tradehouse.component.html',
  styleUrls: ['./tradehouse.component.scss']
})
export class TradehouseComponent implements OnInit {

  public username: string;
  public offers: string[];

  constructor() { }

  ngOnInit(): void {
    this.offers = Array(3);
    this.offers[0] = "Trade 10 Red for 10 Blue";
    this.offers[1] = "Trade 10 Blue for 10 Red";
    this.offers[2] = "Trade 10 Red for 10 Green";
  }

  sendTradehouseOffer(tradehouseOffer: NgForm){
    console.log("sending offer: ", tradehouseOffer.value.offer_get, " for ", tradehouseOffer.value.offer_give);
  }
  deleteOffer(offer: string){
    var indexof_offer = this.offers.indexOf(offer)
    if(indexof_offer > -1){
      this.offers.splice(indexof_offer, 1);
    }
  }

}