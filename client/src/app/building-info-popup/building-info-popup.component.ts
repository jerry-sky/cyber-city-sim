import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface BuildingInfoDialogData {
  buildingName: string;
  before: {
    red: number;
    green: number;
    blue: number;
  };
  after: {
    red: number;
    green: number;
    blue: number;
  };
  cost: {
    red: number;
    green: number;
    blue: number;
  };
}

@Component({
  selector: 'app-building-info-popup',
  templateUrl: './building-info-popup.component.html',
  styleUrls: ['./building-info-popup.component.scss'],
})
export class BuildingInfoPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BuildingInfoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BuildingInfoDialogData
  ) {}

  ngOnInit(): void {}

  goBack(): void {
    this.dialogRef.close(false);
  }

  upgrade(): void {
    this.dialogRef.close(true);
  }
}
