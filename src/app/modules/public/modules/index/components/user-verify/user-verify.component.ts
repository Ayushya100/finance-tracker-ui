import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { PublicService } from 'src/app/modules/public/services/public.service';
import { I18nService } from 'src/app/modules/shared/services/i18n.service';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';

@Component({
  selector: 'app-user-verify',
  templateUrl: './user-verify.component.html',
  styleUrls: ['./user-verify.component.scss']
})
export class UserVerifyComponent implements OnInit {

  staticDataPrefix: any = 'verifyUserComponent.component.';
  row1: string = '';
  row2: string = '';
  row3: string = '';
  row4: string = '';
  btnHeading: string = '';

  constructor(
    private i18n: I18nService,
    private route: ActivatedRoute,
    private publicService: PublicService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.row1 = this.i18n.translate(`${this.staticDataPrefix}Verify your mail`);
    this.row2 = this.i18n.translate(`${this.staticDataPrefix}Please click the button below`);
    this.row3 = this.i18n.translate(`${this.staticDataPrefix}Support team`);
    this.row4 = this.i18n.translate(`${this.staticDataPrefix}Helping us`);
    this.btnHeading = this.i18n.translate(`${this.staticDataPrefix}Verify your account`);
  }

  onSubmit() {
    let userId;
    let verificationCode;

    this.route.paramMap.subscribe(params => {
      userId = params.get('userId');
      verificationCode = params.get('code');
    });

    this.publicService.verifyUser(userId, {verificationCode}).subscribe({
      next: (res: any) => {
        this.notificationService.success(res);
      },
      error: (err: any) => {
        this.notificationService.error(err);
      }
    });
  }

}
