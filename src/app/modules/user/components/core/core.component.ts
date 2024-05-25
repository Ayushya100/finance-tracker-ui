import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { I18nService } from 'src/app/modules/shared/services/i18n.service';
import { UserService } from '../../services/user.service';

// Utils
import { MenuSetupUtils } from '../../utils';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  menuPrefix = 'userSection.userMenu.utils.';

  headerSection: any;
  sections: any;
  queryHeading: string = '';
  isSidebarOpen = true;
  selectedRouterHeading: string = 'Home';
  userInfo: any;
  name: string = '';
  userName: string = '';

  constructor(
    protected router: Router,
    private menuSetupUtils: MenuSetupUtils,
    private i18n: I18nService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.headerSection = await this.menuSetupUtils.getUserMenuHeaderData();
    this.sections = await this.menuSetupUtils.getUserMenuSetupData();
    this.queryHeading = await this.i18n.translate(`${this.menuPrefix}How to use the portal`);

    this.authService.userInfoData.subscribe((data: any) => {
      this.userInfo = data;
      this.name = `${this.userInfo?.firstName} ${this.userInfo?.lastName}`;
      this.userName = `@${this.userInfo?.userName}`;
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

  navigateTo(link: string) {
    this.router.navigate([link]);
  }

  isActive(section: any): boolean {
    if (this.router.url === section.link) {
      this.selectedRouterHeading = section.title;
      return true;
    }
    return false;
  }

}
