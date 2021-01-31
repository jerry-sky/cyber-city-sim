import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AcceptTradeOfferRequest,
  CreateTradeOfferRequest,
} from '../../../../model/server-requests';
import { Resource } from '../../../../model/terrain-type';
import { TradeOffer } from '../../../../model/trade-offer';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  constructor(private backend: BackendService) {}

  /**
   * Return list of all possible trades.
   */
  public GetAllTrades(): Observable<TradeOffer[]> {
    return this.backend.getAllTrades().pipe(map((response) => response.list));
  }

  /**
   * Add a new offer to trade.
   */
  public CreateOffer(
    offeredResource: Resource,
    offeredAmount: number,
    neededResource: Resource,
    neededAmount: number
  ): Observable<boolean> {
    const payload: CreateTradeOfferRequest = {
      offeredResource,
      offeredAmount,
      neededResource,
      neededAmount,
    };
    return this.backend.createOffer(payload);
  }

  /**
   * Accept existing trade offer.
   */
  public AcceptOffer(offerId: number): Observable<boolean> {
    const payload: AcceptTradeOfferRequest = { offerId };
    return this.backend.acceptOffer(payload);
  }
}
