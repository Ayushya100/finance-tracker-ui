import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { I18nService } from 'src/app/modules/shared/services/i18n.service';
import { AuthService } from '../../services/auth.service';
import { LoaderService } from 'src/app/modules/shared/services/loader.service';
import { UserService } from '../../services/user.service';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';

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
  sections: any;
  isSidebarOpen = false;

  selectedRouterHeading: string = '';
  queryHeading: string = '';
  backgroundImg: string = 'assets/img/light-blue-bg.jpg';

  userInfo: any;
  userImg: any;
  name: string = '';
  userName: string = '';

  userId: string | null = '';
  userSetup: any;
  userTheme: any;
  isLoading: boolean = false;

  constructor(
    protected router: Router,
    private menuSetupUtils: MenuSetupUtils,
    private i18n: I18nService,
    private authService: AuthService,
    private loaderService: LoaderService,
    private userService: UserService,
    private notificationService: NotificationService,
    private store: UserStore
  ) {
    this.loaderService.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  async ngOnInit(): Promise<void> {
    this.headerSection = await this.menuSetupUtils.getUserMenuHeaderData();
    this.sections = await this.menuSetupUtils.getUserMenuSetupData();
    this.queryHeading = await this.i18n.translate(`${this.menuPrefix}How to use the portal`);

    this.userId = this.authService.getUserId();
    this.store.loadUserInfo(this.userId);

    this.store.getStateSubject().subscribe((data) => {
      this.userInfo = data;
      this.userSetup = data.userSetup;
      this.userTheme = this.userSetup?.filter((item: any) => item.categoryName === 'user-theme').map((item: any) => item.value)[0];
      this.backgroundImg = this.userTheme ? `assets/img/${this.userTheme}-bg.jpg` : this.backgroundImg;

      this.name = `${data.firstName} ${data.lastName}`;
      this.userName = `@${data.userName}`;
      this.userImg = data.profileImageURL ? data.profileImageURL : 'assets/img/dummy-user.png';
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleSection(section: any) {
    this.sections.forEach((item: any) => {
      if (item !== section) {
        item.open = false;
      }
    });
    section.open = !section.open;
  }

  closeSidebar() {
    if (window.innerWidth < 768) {
      this.isSidebarOpen = this.isSidebarOpen === false ? true : false;
    }
  }

  @HostListener('window.resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth >= 768) {
      this.isSidebarOpen = true;
    } else {
      this.isSidebarOpen = false;
    }
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

}
