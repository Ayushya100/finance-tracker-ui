import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { I18nService } from 'src/app/modules/shared/services/i18n.service';
import { PublicService } from 'src/app/modules/public/services/public.service';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';

// Utils
import { UserFormsUtils } from 'src/app/modules/public/utils';
import { RegexPatterns } from 'src/app/modules/shared/modules/pattern-validators';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  staticDataPrefix: any = 'registerUserComponent.component.';
  userFields: any;
  userForm: any;
  userValidators: any;
  userRegistrationForm!: FormGroup;

  title: string = 'Register';
  header: string = 'Ready to get started';
  subHeader: string = 'Required Fields';
  btnHeading: string = 'Register';

  constructor(
    private i18n: I18nService,
    private publicService: PublicService,
    private userFormsUtils: UserFormsUtils,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.userRegistrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      emailId: ['', [Validators.required, Validators.pattern(RegexPatterns.email)]],
      userName: ['', [Validators.required, Validators.pattern(RegexPatterns.userName)]],
      password: ['', [Validators.required, Validators.pattern(RegexPatterns.password)]],
    });
  }

  ngOnInit(): void {
    this.title = this.i18n.translate(`${this.staticDataPrefix}Register User`);
    this.header = this.i18n.translate(`${this.staticDataPrefix}Ready to Get Started? Join us Today!`);
    this.subHeader = this.i18n.translate(`${this.staticDataPrefix}Required Fields`);
    this.btnHeading = this.i18n.translate(`${this.staticDataPrefix}Register`);

    this.userFields = this.userFormsUtils.getUserRegistrationFormsMetadata();
    this.userForm = this.userFields.fields;
    this.userValidators = this.userFields.validators;
  }

  onSubmit($event: any) {
    let payload = {
      firstName: $event.value.firstName,
      lastName: $event.value.lastName,
      userName: $event.value.userName,
      emailId: $event.value.emailId,
      password: $event.value.password
    };
    
    this.publicService.registerUser(payload).subscribe({
      next: (res: any) => {
        this.notificationService.success(res);
      },
      error: (err: any) => {
        this.notificationService.error(err);
      }
    });
  }

}
