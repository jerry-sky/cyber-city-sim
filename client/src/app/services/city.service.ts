import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BuildingType } from '../../../../model/building-type';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  refreashSignalSource = new Subject<string>();
  refreashSignal = this.refreashSignalSource.asObservable();

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
   * Send signal to city-detail.component to refreash user resources.
   */
  public sendRefreashSignal(): void {
    this.refreashSignalSource.next('Please refreash');
  }
}
