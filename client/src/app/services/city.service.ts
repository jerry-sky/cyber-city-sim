import { Injectable } from '@angular/core';
import { BuildingType } from '../../../../model/building-type';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private backend: BackendService) {}

  /**
   * Upgrade building that is present on the selected city cell.
   */
  public UpgradeBuilding(cellId: number): void {
    this.backend.upgradeBuilding({ cellId }).subscribe();
  }

  /**
   * Buy a building of chosen type on the selected city cell.
   */
  public BuyBuilding(cellId: number, buildingType: BuildingType): void {
    this.backend.buyBuilding({ cellId, buildingType }).subscribe();
  }
}