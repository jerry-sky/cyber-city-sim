import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BuildingType } from '../../../../model/building-type';
import { BackendService } from './backend.service';
import { Map } from '../../../../model/map';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private backend: BackendService) {}

  /**
   * Upgrade building that is present on the selected city cell.
   */
  public UpgradeBuilding(cellId: number): Observable<boolean> {
    return this.backend.upgradeBuilding({ cellId });
  }

  /**
   * Buy a building of chosen type on the selected city cell.
   */
  public BuyBuilding(
    cellId: number,
    buildingType: BuildingType
  ): Observable<boolean> {
    return this.backend.buyBuilding({ cellId, buildingType });
  }

  /**
   * Buy a cell for city beginning or expansion.
   */
  public BuyCell(cellId: number): Observable<boolean> {
    return this.backend.buyCell({ cellId });
  }

  /**
   * Get map configuration.
   */
  public GetMap(): Observable<Map> {
    // if everything went okay, then the response contains map's data
    return this.backend.getMap().pipe(map((response) => response.map));
  }
}
