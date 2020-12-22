import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface InfoData {
  // message to be shown
  message: string;
  // action on the button
  btn: string;
}

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.scss']
})
export class InfoPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<InfoData>,
    @Inject(MAT_DIALOG_DATA) public data: InfoData
  ) {}

  ngOnInit(): void {}

  goBack(): void {
    this.dialogRef.close(true);
  }
}
