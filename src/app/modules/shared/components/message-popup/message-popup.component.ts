import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-popup',
  templateUrl: './message-popup.component.html',
  styleUrls: ['./message-popup.component.scss']
})
export class MessagePopupComponent {

  @Input() msgHeader: string = '';
  @Input() msgBody: string = '';
  @Input() msgFooter: string = '';

  constructor(
    public dialogRef: MatDialogRef<MessagePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.msgHeader = data.msgHeader;
    this.msgBody = data.msgBody;
    this.msgFooter = data.msgFooter;
  }

  close(): void {
    this.dialogRef.close();
  }

}
