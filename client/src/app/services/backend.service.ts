import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LoginRequest,
  RegisterRequest,
  GetPrivateMessagesRequest,
  SendPrivateMessageRequest,
  UpgradeBuildingRequest,
  BuyBuildingRequest,
  SimpleIdRequest,
  ClaimCellRequest,
  SendGlobalMessageRequest,
  CreateTradeOfferRequest,
  AcceptTradeOfferRequest,
} from '../../../../model/server-requests';
import {
  LoginResponse,
  MapResponse,
  GlobalMessagesResponse,
  MessageboxUsernamesResponse,
  UserResponse,
  PrivateMessagesResponse,
  UsernameDictionaryResponse,
  TradeOffersResponse,
  CreateTradeOfferResponse,
} from '../../../../model/server-responses';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private usersUrl = environment.API + '/user';
  private mapUrl = environment.API + '/map';
  private cityUrl = environment.API + '/city';
  private globalChatUrl = environment.API + '/global-chat';
  private userChatsUrl = environment.API + '/user-chats';
  private usernamesUrl = environment.API + '/usernames';
  private tradehouseUrl = environment.API + '/tradehouse';

  /**
   * Options to use when performing any HTTP requests.
   * The `withCredentials` option ensures that the session cookie is sent with every request.
   */
  private options = { withCredentials: true };

  constructor(private http: HttpClient) {}

  public userLogin(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post(
      this.usersUrl + '/login',
      payload,
      this.options
    ) as Observable<LoginResponse>;
  }

  public userRegister(payload: RegisterRequest): Observable<never> {
    return this.http.post(
      this.usersUrl + '/register',
      payload,
      this.options
    ) as Observable<never>;
  }

  public getMap(): Observable<MapResponse> {
    return this.http.get(this.mapUrl, this.options) as Observable<MapResponse>;
  }

  public upgradeBuilding(payload: UpgradeBuildingRequest): Observable<never> {
    return this.http.post(
      this.cityUrl + '/upgrade-building',
      payload,
      this.options
    ) as Observable<never>;
  }

  public buyBuilding(payload: BuyBuildingRequest): Observable<never> {
    return this.http.post(
      this.cityUrl + '/buy-building',
      payload,
      this.options
    ) as Observable<never>;
  }

  public buyCell(payload: ClaimCellRequest): Observable<never> {
    return this.http.post(
      this.mapUrl + '/claim-cell',
      payload,
      this.options
    ) as Observable<never>;
  }

  public getUserResources(payload: SimpleIdRequest): Observable<LoginResponse> {
    return this.http.post(
      this.usersUrl + '/resources',
      payload,
      this.options
    ) as Observable<LoginResponse>;
  }

  public sendGlobalMessage(
    payload: SendGlobalMessageRequest
  ): Observable<never> {
    return this.http.post(
      this.globalChatUrl,
      payload,
      this.options
    ) as Observable<never>;
  }

  public getGlobalMessages(): Observable<GlobalMessagesResponse> {
    return this.http.get(
      this.globalChatUrl,
      this.options
    ) as Observable<GlobalMessagesResponse>;
  }

  public getUserChats(): Observable<MessageboxUsernamesResponse> {
    return (this.http.post(
      this.userChatsUrl,
      this.options
    ) as unknown) as Observable<MessageboxUsernamesResponse>;
  }

  public getCurrentUser(): Observable<UserResponse> {
    return this.http.get(
      this.usersUrl + '/user-data',
      this.options
    ) as Observable<UserResponse>;
  }

  public getPrivateMessages(
    payload: GetPrivateMessagesRequest
  ): Observable<PrivateMessagesResponse> {
    return this.http.post(
      this.userChatsUrl + '/messages',
      payload,
      this.options
    ) as Observable<PrivateMessagesResponse>;
  }

  public sendPrivateMessage(
    payload: SendPrivateMessageRequest
  ): Observable<never> {
    return (this.http.post(
      this.userChatsUrl + '/send-message',
      payload,
      this.options
    ) as unknown) as Observable<never>;
  }

  public getUsernameDictionary(): Observable<UsernameDictionaryResponse> {
    return this.http.get(
      this.usersUrl + '/usernames',
      this.options
    ) as Observable<UsernameDictionaryResponse>;
  }

  public getAllTrades(): Observable<TradeOffersResponse> {
    return this.http.get(
      this.tradehouseUrl,
      this.options
    ) as Observable<TradeOffersResponse>;
  }

  public createOffer(
    payload: CreateTradeOfferRequest
  ): Observable<CreateTradeOfferResponse> {
    return this.http.post(
      this.tradehouseUrl,
      payload,
      this.options
    ) as Observable<CreateTradeOfferResponse>;
  }

  public acceptOffer(payload: AcceptTradeOfferRequest): Observable<never> {
    return this.http.put(
      this.tradehouseUrl,
      payload,
      this.options
    ) as Observable<never>;
  }
}
