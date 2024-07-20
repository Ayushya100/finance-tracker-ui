import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.scss']
})
export class UserDetailsFormComponent implements OnInit, OnChanges {

  @Input() title: string = '';
  @Input() actions: any;

  @Input() form: any;
  @Input() formDetails: any;
  @Input() formData: any;

  @Output() formSubmitData = new EventEmitter<any>();

  hidePassword: boolean = true;
  detectChanges: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.loadFormInitialData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const formData: SimpleChange = changes['formData'];
    if (formData && !formData.firstChange) {
      this.loadFormInitialData();
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  loadFormInitialData() {
    if (this.formData) {
      this.form.patchValue(this.formData);
    }
  }

  onClickFormAction(actionType: any) {
    if (actionType === 'cancel') {
      this.loadFormInitialData();
    }
    if (actionType === 'submit') {
      this.formSubmitData.emit(this.form.value);
    }
  }

}
