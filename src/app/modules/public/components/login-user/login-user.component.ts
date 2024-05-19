import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { I18nService } from 'src/app/modules/shared/services/i18n.service';
import { PublicService } from '../../services/public.service';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';

// Utils
import { UserFormsUtils } from '../../utils';
import { RegexPatterns } from 'src/app/modules/shared/modules/pattern-validators';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {

  staticDataPrefix: any = 'loginUserComponent.component.';
  userFields: any;
  userForm: any;
  userValidators: any;
  userLoginForm!: FormGroup;

  title: string = 'Login';
  header: string = 'Welcome Back';
  subHeader: string = 'Required Fields';
  btnHeading: string = 'Login';

  constructor(
    private i18n: I18nService,
    private publicService: PublicService,
    private userFormsUtils: UserFormsUtils,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.userLoginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    this.title = await this.i18n.translate(`${this.staticDataPrefix}LogIn`);
    this.header = await this.i18n.translate(`${this.staticDataPrefix}Welcome Back`);
    this.subHeader = await this.i18n.translate(`${this.staticDataPrefix}Required Fields`);
    this.btnHeading = await this.i18n.translate(`${this.staticDataPrefix}LogIn`);

    this.userFields = await this.userFormsUtils.getUserLoginFormsMetadata();
    this.userForm = this.userFields.fields;
    this.userValidators = this.userFields.validators;
  }

  onSubmit($event: any) {
    let payload = {
      userNameOrEmail: $event.value.userName,
      password: $event.value.password
    }
    
    this.publicService.loginUser(payload).subscribe({
      next: (res: any) => {
        this.notificationService.successMessage(res.message, res.statusCode);
      },
      error: (err: any) => {
        this.notificationService.errorMessage(err.error.errors, err.error.statusCode);
      }
    });
  }
}
