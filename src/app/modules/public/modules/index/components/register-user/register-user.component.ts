import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { I18nService } from 'src/app/modules/shared/services/i18n.service';
import { PublicService } from 'src/app/modules/public/services/public.service';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';

// Utils
import { RegexPatterns } from 'src/app/modules/shared/modules/pattern-validators';
import { UserFormsUtils } from 'src/app/modules/public/utils';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

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

  async ngOnInit(): Promise<void> {
    this.title = await this.i18n.translate(`${this.staticDataPrefix}Register User`);
    this.header = await this.i18n.translate(`${this.staticDataPrefix}Ready to Get Started? Join us Today!`);
    this.subHeader = await this.i18n.translate(`${this.staticDataPrefix}Required Fields`);
    this.btnHeading = await this.i18n.translate(`${this.staticDataPrefix}Register`);

    this.userFields = await this.userFormsUtils.getUserRegistrationFormsMetadata();
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
        this.notificationService.successMessage(res.message, res.statusCode);
      },
      error: (err: any) => {
        this.notificationService.errorMessage(err.error.errors, err.error.statusCode);
      }
    });
  }
}
