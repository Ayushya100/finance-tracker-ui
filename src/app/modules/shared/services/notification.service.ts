import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

// Component
import { NotificationPopupComponent } from '../components/notification-popup/notification-popup.component';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private dialogRefs: MatDialogRef<NotificationPopupComponent>[] = [];

  constructor(private dialog: MatDialog) { }

  showNotification(type: string, message: string, statusCode?: number, statusType?: string) {
    const dialogRef = this.dialog.open(NotificationPopupComponent, {
      width: 'auto',
      height: 'auto',
      position: { top: `${this.dialogRefs.length * 80 + 20}px`, right: '20px' },
      data: { type, message, statusCode, statusType }
    });
    this.dialogRefs.push(dialogRef);

    setTimeout(() => {
      this.closeNotification(dialogRef);
    }, 2000);
  }

  private closeNotification(dialogRef: MatDialogRef<NotificationPopupComponent>) {
    const index = this.dialogRefs.indexOf(dialogRef);
    if (index !== -1) {
      dialogRef.close();
      this.dialogRefs.splice(index, 1);
      this.updatePositions();
    }
  }

  private updatePositions() {
    this.dialogRefs.forEach((dialogRef, index) => {
      dialogRef.updatePosition({ top: `${index * 80 + 20}px`, right: '20px' });
    });
  }

  success(res: any) {
    this.successMessage(res.message, res.statusCode, res.type);
  }

  error(err: any) {
    this.errorMessage(err.error.errors, err.error.statusCode, err.error.type);
  }

  successMessage(msg: string, code? : number, type?: string) {
    this.showNotification('SUCCESS', msg, code, type);
  }
  
  errorMessage(msg: string, code? : number, type?: string) {
    this.showNotification('ERROR', msg, code, type);
  }

}
