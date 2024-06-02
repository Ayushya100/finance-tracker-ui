import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  openNotificationSnackbar(className: string, msg: string, code: number) {
    const message = `${code} - ${msg}`;
    this.snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [className]
    });
  }

  success(res: any) {
    this.successMessage(res.message, res.statusCode);
  }

  error(err: any) {
    this.errorMessage(err.error.errors, err.error.statusCode);
  }

  successMessage(msg: string, code? : number) {
    this.openNotificationSnackbar('success-notification', msg, code || 200);
  }

  errorMessage(msg: string, code? : number) {
    this.openNotificationSnackbar('error-notification', msg, code || 500);
  }
  
}
