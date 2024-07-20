import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { I18nService } from 'src/app/modules/shared/services/i18n.service';
import { AuthService } from '../../services/auth.service';
import { LoaderService } from 'src/app/modules/shared/services/loader.service';
import { UserService } from '../../services/user.service';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { ThemeService } from 'src/app/modules/shared/services/theme.service';

// Utils
import { MenuSetupUtils } from '../../utils';
import { UserStore } from '../../stores/user.store';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  menuPrefix = 'userSection.userMenu.utils.';

  headerSection: any;
  generalOptionSections: any;
  logOutSection: any;
  sections: any;
  isSidebarOpen = false;

  selectedRouterHeading: string = '';
  queryHeading: string = '';
  emailHeading: string = '';
  lastLoginHeading: string = '';
  backgroundImg: string | null = 'assets/img/light-blue-bg.jpg';

  userInfo: any;
  userImg: any;
  name: string = '';
  userName: string = '';
  userEmailId: string = '';
  lastLogin: any;

  userId: string | null = '';
  userSetup: any;
  userTheme: any;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private menuSetupUtils: MenuSetupUtils,
    private i18n: I18nService,
    private authService: AuthService,
    private loaderService: LoaderService,
    private userService: UserService,
    private notificationService: NotificationService,
    private themeService: ThemeService,
    private store: UserStore
  ) {
    this.loaderService.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.themeService.backgroundImg$.subscribe(img => {
      this.backgroundImg = img;
    });
  }

  ngOnInit(): void {
    this.headerSection = this.menuSetupUtils.getUserMenuHeaderData();
    this.sections = this.menuSetupUtils.getUserMenuSetupData();
    this.queryHeading = this.i18n.translate(`${this.menuPrefix}How to use the portal`);
    this.emailHeading = this.i18n.translate(`${this.menuPrefix}Email Id`);
    this.lastLoginHeading = this.i18n.translate(`${this.menuPrefix}Last Login`);

    this.generalOptionSections = this.headerSection.filter((item: any) => item.icon !== 'logout');
    this.logOutSection = this.headerSection.filter((item: any) => item.icon === 'logout');

    this.userId = this.authService.getUserId();
    this.store.loadUserInfo(this.userId);
    this.store.loadUserSetup(this.userId);

    this.store.getStateSubject().subscribe((data) => {
      this.userInfo = data;
      this.userEmailId = this.userInfo.emailId;
      this.lastLogin = this.getFullDate(this.userInfo.lastLogin);
      this.userSetup = data.userSetup;
      this.themeService.loadSystemSetup(this.userSetup);
      
      this.name = `${data.firstName} ${data.lastName}`;
      this.userName = `@${data.userName}`;
      this.userImg = data.profileImageURL ? data.profileImageURL : 'assets/img/dummy-user.png';
    });
  }

  navigateTo(section: any) {
    if (section.title !== 'Logout') {
      this.router.navigate([`/user/${this.userId}${section.link}`]);
    } else {
      this.userService.logoutUser().subscribe({
        next: (res) => {
          this.notificationService.success(res);
          this.authService.clearAuthData();
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error(`Error while logging out user: ${err}`);
          this.notificationService.error(err);
        }
      });
    }
  }

  isActive(section: any): boolean {
    const linkArr = this.router.url.split('/');
    let link = '/';
    if (linkArr.length > 3) {
      link += linkArr.slice(3).join('/');
    }

    if (link === section.link) {
      this.selectedRouterHeading = section?.title;
      return true;
    }
    return false;
  }

  getFullDate(inputDate: any) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

}
