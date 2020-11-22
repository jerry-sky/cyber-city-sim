import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface NewBuildingDialogData {
  building1: {
    name: string,
    red: number,
    green: number,
    blue: number
  };
  building2: {
    name: string,
    red: number,
    green: number,
    blue: number
  };
  building3: {
    name: string,
    red: number,
    green: number,
    blue: number
  };
}

@Component({
  selector: 'app-new-building-popup',
  templateUrl: './new-building-popup.component.html',
  styleUrls: ['./new-building-popup.component.scss']
})
export class NewBuildingPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewBuildingPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewBuildingDialogData
  ) { }

  ngOnInit(): void {
  }

  newBuilding(buildingType): void {
    this.dialogRef.close(buildingType);
  }

}
