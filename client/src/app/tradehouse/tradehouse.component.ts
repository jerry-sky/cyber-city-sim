import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LogoutPopupComponent } from '../logout-popup/logout-popup.component';
import { TradeService } from '../services/trade.service';
import { TradeOffer } from '../../../../model/trade-offer';
import { Resource, ResourceNames } from '../../../../model/terrain-type';

@Component({
  selector: 'app-tradehouse',
  templateUrl: './tradehouse.component.html',
  styleUrls: ['./tradehouse.component.scss'],
})
export class TradehouseComponent implements OnInit {
  public username: string;
  public offers: TradeOffer[];
  public offersStr: string[];
  public meansOfTrade: string[];

  constructor(public dialog: MatDialog, private trade: TradeService) {}

  ngOnInit(): void {
    // get resource names
    this.meansOfTrade = Object.keys(ResourceNames).map((i) => ResourceNames[i]);
    // show possible trades
    this.trade.GetAllTrades().subscribe(
      (res) => {
        this.offers = res;
        this.offersStr = res.map(
          (t) =>
            `[${t.id}] Get ${t.offeredResourceQuantity} ${t.offeredResourceType} for ${t.neededResourceQuantity} ${t.neededResourceType}`
        );
      },
      (err) => console.error('Error retriving trades from server')
    );
  }

  /**
   * User is trying to create a new offer.
   *
   * @param tradehouseOffer form with exchange values
   */
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
    const meanGetResource =
      Resource[
        Object.keys(ResourceNames).find((key) => ResourceNames[key] === meanGet)
      ];
    const meanGiveResource =
      Resource[
        Object.keys(ResourceNames).find(
          (key) => ResourceNames[key] === meanGive
        )
      ];
    this.trade
      .CreateOffer(meanGiveResource, offerGive, meanGetResource, offerGet)
      .subscribe(
        (res) => {
          const maxId =
            this.offers.reduce((prev, curr) => {
              if (curr.id > prev.id) {
                return curr;
              } else {
                return prev;
              }
            }).id || -1;
          const newOffer = `[${
            maxId + 1
          }] Get ${offerGet} ${meanGet} for ${offerGive} ${meanGive}`;
          this.offersStr.push(newOffer);
        },
        (err) => alert(err.error.errorCode)
      );
  }

  /**
   * Accept chosen option for trade.
   *
   * @param offer string value of choosen offer
   */
  acceptOffer(offer: string): void {
    const i = offer.indexOf('[');
    const j = offer.indexOf(']');
    const offerId = Number(offer.substring(i + 1, j));
    this.trade.AcceptOffer(offerId).subscribe(
      (res) => {
        const offerIndex = this.offersStr.indexOf(offer);
        if (offerIndex > -1) {
          this.offersStr.splice(offerIndex, 1);
        }
      },
      (err) => alert(err.error.errorCode)
    );
  }

  logout(): void {
    this.dialog.open(LogoutPopupComponent, { width: '400px' });
  }
}
