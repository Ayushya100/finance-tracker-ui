import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// Services
import { ThemeService } from 'src/app/modules/shared/services/theme.service';

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

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.userTheme.subscribe(
      data => {
        this.hidePasswordIcon = `assets/img/${data}-closed-eye.png`;
        this.showPasswordIcon = `assets/img/${data}-open-eye.png`;
      }
    );
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
