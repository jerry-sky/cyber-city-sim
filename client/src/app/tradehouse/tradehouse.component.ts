import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LogoutPopupComponent } from '../logout-popup/logout-popup.component';


@Component({
  selector: 'app-tradehouse',
  templateUrl: './tradehouse.component.html',
  styleUrls: ['./tradehouse.component.scss']
})
export class TradehouseComponent implements OnInit {

  public username: string;
  public offers: string[];

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.offers = Array(3);
    this.offers[0] = 'Trade 10 Red for 10 Blue';
    this.offers[1] = 'Trade 10 Blue for 10 Red';
    this.offers[2] = 'Trade 10 Red for 10 Green';
  }

  sendTradehouseOffer(tradehouseOffer: NgForm): void {
    const offerGet = tradehouseOffer.value.offer_get.trim();
    const offerGive = tradehouseOffer.value.offer_give.trim();
    if (!offerGet || !offerGive){
      alert('Specify correct offer');
      return;
    }
    const newOffer = `Trade ${offerGet} for ${offerGive}`;
    this.offers.push(newOffer);
    console.log(`sending offer: ${newOffer}`);
  }

  acceptOffer(offer: string): void {
    const indexofOffer = this.offers.indexOf(offer);
    if (indexofOffer > -1){
      this.offers.splice(indexofOffer, 1);
    }
  }

  logout(): void {
    this.dialog.open(LogoutPopupComponent, {width: '400px'});
  }

}
