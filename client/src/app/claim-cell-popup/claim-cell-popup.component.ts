import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CellCost } from '../../../../model/terrain-type';
import { UserService } from '../services/user.service';

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
    private usr: UserService,
    @Inject(MAT_DIALOG_DATA) public terrainType: number
  ) {}

  ngOnInit(): void {
    // read cost
    this.usr.userDataSignal.subscribe((data) => {
      if (data != null) {
        const land = data.cells;
        const c = CellCost(this.terrainType, land);
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
    });
  }

  goBack(): void {
    this.dialogRef.close(false);
  }

  claim(): void {
    this.dialogRef.close(true);
  }
}
