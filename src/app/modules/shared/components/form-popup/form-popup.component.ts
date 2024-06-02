import { Component, Inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-popup',
  templateUrl: './form-popup.component.html',
  styleUrls: ['./form-popup.component.scss']
})
export class FormPopupComponent {

  @Input() form: FormGroup;
  @Input() title: string;
  @Input() actions: any;
  @Input() formDetails: any;
  @Input() message: string;

  hidePassword: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<FormPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = data.form;
    this.title = data.title;
    this.actions = data.actions;
    this.formDetails = data.formDetails;
    this.message = data.message;
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close();
  }
}
