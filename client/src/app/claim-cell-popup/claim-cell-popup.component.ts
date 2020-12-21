import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpgradeCosts as BuildingsCosts } from '../../../../model/resource-production/upgrade-costs';
import { CellCost } from '../../../../model/terrain-type';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-claim-cell-popup',
  templateUrl: './claim-cell-popup.component.html',
  styleUrls: ['./claim-cell-popup.component.scss'],
})
export class ClaimCellPopupComponent implements OnInit {
  cost = {
    red: 0,
    green: 0,
    blue: 0,
  };
  constructor(
    public dialogRef: MatDialogRef<ClaimCellPopupComponent>,
    public auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public terrainType: number) {}

  ngOnInit(): void {
    // read cost
    const c = CellCost(this.terrainType, this.auth.GetUserLand());
    switch (this.terrainType) {
      case 0:
        this.cost.red = c;
        break;
      case 1:
        this.cost.blue = c;
        break;
      case 2:
        this.cost.green = c;
        break;
    }
  }

  goBack(): void {
    this.dialogRef.close(false);
  }

  claim(): void {
    this.dialogRef.close(true);
  }
}
