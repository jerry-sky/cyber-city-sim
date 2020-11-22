import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';


export interface DialogData {
  username: string;
  production: {
    red: number,
    green: number,
    blue: number
  };
  resources: {
    red: number,
    green: number,
    blue: number
  };
}

@Component({
  selector: 'app-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrls: ['./profile-popup.component.scss']
})
export class ProfilePopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProfilePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.dialogRef.close();
  }

  chat(): void {
    this.dialogRef.close();
    this.router.navigate([`/chat/${this.data.username}`]);
  }

}
