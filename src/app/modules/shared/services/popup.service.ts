import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

import { FormPopupComponent } from '../components/form-popup/form-popup.component';
import { MessagePopupComponent } from '../components/message-popup/message-popup.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private dialog: MatDialog) { }

  openFormPopup(popupInputs: any): Promise<any> {
    const dialogRef = this.dialog.open(FormPopupComponent, {
      width: '40%',
      height: '50%',
      disableClose: false,
      data: popupInputs
    });

    return firstValueFrom(dialogRef.afterClosed());
  }

  openMsgPopup(popupInputs: any): Promise<any> {
    const dialogRef = this.dialog.open(MessagePopupComponent, {
      width: '40%',
      height: '45%',
      disableClose: false,
      data: popupInputs
    });

    return firstValueFrom(dialogRef.afterClosed());
  }
}
