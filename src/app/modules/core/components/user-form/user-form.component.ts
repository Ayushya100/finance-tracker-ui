import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// Services
import { I18nService } from 'src/app/modules/shared/services/i18n.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input() popupTitle: string = '';
  @Input() popupHeader: string = '';
  @Input() popupSubHeader: string = '';
  @Input() btnHeader: string = '';

  @Input() form: any;
  @Input() formData: any;
  @Input() formValidators: any;

  @Output() formSubmitData = new EventEmitter<any>();

  hidePassword: boolean = true;
  userTheme: string = '';
  hidePasswordIcon: string = '';
  showPasswordIcon: string = '';

  constructor(private i18n: I18nService) { }

  ngOnInit(): void {
    this.i18n.getUserSetup().subscribe({
      next: (userSetup: any) => {
        this.userTheme = userSetup.data?.filter((val: any) => val.categoryName === 'user-theme').map((val: any) => val.default)[0];
        this.hidePasswordIcon = `assets/img/${this.userTheme}-closed-eye.png`;
        this.showPasswordIcon = `assets/img/${this.userTheme}-open-eye.png`;
      },
      error: (err: any) => {
        console.error(`Failed to load the system setup : ${err}`);
      }
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  isValid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return control?.touched && control?.valid || false;
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return control?.touched && control?.invalid || false;
  }

  onFormSubmit() {
    this.formSubmitData.emit(this.form);
  }

}
