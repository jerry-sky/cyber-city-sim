import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user.service';

export interface ClaimCellData {
  red: number;
  green: number;
  blue: number;
}

@Component({
  selector: 'app-claim-cell-popup',
  templateUrl: './claim-cell-popup.component.html',
  styleUrls: ['./claim-cell-popup.component.scss'],
})
export class ClaimCellPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ClaimCellPopupComponent>,
    private usr: UserService,
    @Inject(MAT_DIALOG_DATA) public cost: ClaimCellData
  ) {}

  ngOnInit(): void {}

  goBack(): void {
    this.dialogRef.close(false);
  }

  claim(): void {
    this.dialogRef.close(true);
  }
}
