import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout-popup',
  templateUrl: './logout-popup.component.html',
  styleUrls: ['./logout-popup.component.scss'],
})
export class LogoutPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LogoutPopupComponent>,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {}

  goBack(): void {
    this.dialogRef.close();
  }

  logout(): void {
    this.dialogRef.close();
    this.auth.Logout();
    this.router.navigate(['/login']);
  }
}
