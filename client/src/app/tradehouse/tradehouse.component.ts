import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LogoutPopupComponent } from '../logout-popup/logout-popup.component';
import { TradeService } from '../services/trade.service';
import { TradeOffer } from '../../../../model/trade-offer';
import { Resource, ResourceNames } from '../../../../model/terrain-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tradehouse',
  templateUrl: './tradehouse.component.html',
  styleUrls: ['./tradehouse.component.scss'],
})
export class TradehouseComponent implements OnInit {
  public username: string;
  public userId: number;
  public offers: TradeOffer[];
  public meansOfTrade: string[];

  constructor(
    public dialog: MatDialog,
    private trade: TradeService,
    private usr: UserService
  ) {}

  ngOnInit(): void {
    // get resource names
    this.meansOfTrade = Object.keys(ResourceNames).map((i) => ResourceNames[i]);
    // show possible trades
    this.trade.GetAllTrades().subscribe(
      (res) => {
        this.offers = res;
      },
      (err) => console.error('Error retriving trades from server')
    );
    // get user id
    this.usr.userDataSignal.subscribe((data) => {
      if (data != null) {
        this.userId = data.id;
      }
    });
  }

  /**
   * User is trying to create a new offer.
   *
   * @param tradehouseOffer form with exchange values
   */
  sendTradehouseOffer(tradehouseOffer: NgForm): void {
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
    if (meanGet === meanGive) {
      alert('Cannot exchange for the same resource');
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
          const newOffer = {
            id: res,
            sellerId: this.userId,
            neededResourceType: meanGet,
            neededResourceQuantity: offerGet,
            offeredResourceType: meanGive,
            offeredResourceQuantity: offerGive,
          } as TradeOffer;
          this.offers.push(newOffer);
          this.usr.addResource(meanGive, offerGive * -1);
        },
        (err) => alert(err.error.errorCode)
      );
  }

  /**
   * Accept chosen option for trade.
   *
   * @param offer string value of choosen offer
   */
  acceptOffer(offer: TradeOffer): void {
    if (offer.sellerId === this.userId) {
      alert('Cannot accept your own offer');
      return;
    }
    this.trade.AcceptOffer(offer.id).subscribe(
      (res) => {
        this.offers = this.offers.filter((o) => o.id !== offer.id);
        const meanGive = offer.neededResourceType;
        const meanGet = offer.offeredResourceType;
        this.usr.addResource(meanGive, offer.neededResourceQuantity * -1);
        this.usr.addResource(meanGet, offer.offeredResourceQuantity);
      },
      (err) => alert(err.error.errorCode)
    );
  }

  logout(): void {
    this.dialog.open(LogoutPopupComponent, { width: '400px' });
  }
}
