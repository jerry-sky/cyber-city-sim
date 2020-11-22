import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-popup',
  templateUrl: './logout-popup.component.html',
  styleUrls: ['./logout-popup.component.scss']
})
export class LogoutPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LogoutPopupComponent>,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.dialogRef.close();
  }

  logout(): void {
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }

}
