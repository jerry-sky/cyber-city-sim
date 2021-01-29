import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LogoutPopupComponent } from '../logout-popup/logout-popup.component';

@Component({
  selector: 'app-tradehouse',
  templateUrl: './tradehouse.component.html',
  styleUrls: ['./tradehouse.component.scss'],
})
export class TradehouseComponent implements OnInit {
  public username: string;
  public offers: string[];
  public meansOfTrade = ['Red', 'Green', 'Blue', 'Cell'];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.offers = Array(3);
    this.offers[0] = 'Trade 10 Red for 10 Blue';
    this.offers[1] = 'Trade 10 Blue for 10 Red';
    this.offers[2] = 'Trade 10 Red for 10 Green';
  }

  //method executed when clicking on the submit <<trade house offer form>> button, verifying and sending the tradehouse offer
  sendTradehouseOffer(tradehouseOffer: NgForm): void {
    console.log(tradehouseOffer);
    const offerGet = Number(tradehouseOffer.value.offer_get.trim());
    const meanGet = tradehouseOffer.value.mean_get.trim();
    const offerGive = Number(tradehouseOffer.value.offer_give.trim());
    const meanGive = tradehouseOffer.value.mean_give.trim();
    if (
      !offerGet ||
      !meanGet ||
      !offerGive ||
      !meanGive ||
      offerGet <= 0 ||
      offerGive <= 0
    ) {
      alert('Fill all required fields correctly');
      return;
    }
    const newOffer = `Trade ${offerGet} ${meanGet} for ${offerGive} ${meanGive}`;
    this.offers.push(newOffer);
    console.log(newOffer);
  }

  //method verifying that user is able to accept the offer and removing the offer from the tradehouse
  acceptOffer(offer: string): void {
    const indexofOffer = this.offers.indexOf(offer);
    if (indexofOffer > -1) {
      this.offers.splice(indexofOffer, 1);
    }
  }

  logout(): void {
    this.dialog.open(LogoutPopupComponent, { width: '400px' });
  }
}
