import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { PublicService } from 'src/app/modules/public/services/public.service';
import { I18nService } from 'src/app/modules/shared/services/i18n.service';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { AuthService } from 'src/app/modules/user/services/auth.service';

// Utils
import { UserFormsUtils } from 'src/app/modules/public/utils';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

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
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userLoginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.title = this.i18n.translate(`${this.staticDataPrefix}LogIn`);
    this.header = this.i18n.translate(`${this.staticDataPrefix}Welcome Back`);
    this.subHeader = this.i18n.translate(`${this.staticDataPrefix}Required Fields`);
    this.btnHeading = this.i18n.translate(`${this.staticDataPrefix}LogIn`);

    this.userFields = this.userFormsUtils.getUserLoginFormsMetadata();
    this.userForm = this.userFields.fields;
    this.userValidators = this.userFields.validators;
  }

  onSubmit($event: any) {
    let payload = {
      userNameOrEmail: $event.value.userName,
      password: $event.value.password
    };
    
    this.publicService.loginUser(payload).subscribe({
      next: (res: any) => {
        this.notificationService.success(res);
        this.authService.setUserToken(res.data.accessToken);
        this.authService.setRefreshToken(res.data.refreshToken);
        this.authService.setUserId(res.data.userId);
        this.authService.setUserRole(res.data.userRole);
        this.authService.setUserScope(res.data.userScopes);
        this.authService.setUserSetup(res.data.userSetup);
        this.router.navigate([`/user/${res.data.userId}`]);
      },
      error: (err: any) => {
        this.notificationService.error(err);
      }
    });
  }
}
