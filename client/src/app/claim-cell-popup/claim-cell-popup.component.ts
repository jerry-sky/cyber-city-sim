import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpgradeCosts as BuildingsCosts } from '../../../../model/resource-production/upgrade-costs';

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
  constructor(public dialogRef: MatDialogRef<ClaimCellPopupComponent>) {}

  ngOnInit(): void {
    // read cost
    this.cost = BuildingsCosts.default['claim-cell'];
  }

  goBack(): void {
    this.dialogRef.close(false);
  }

  claim(): void {
    this.dialogRef.close(true);
  }
}
