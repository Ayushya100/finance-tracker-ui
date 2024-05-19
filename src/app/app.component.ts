import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { I18nService } from './modules/shared/services/i18n.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title: string = 'Finance Tracker';
  appQuote: string = '';
  userLang: string = '';
  userTheme: string = '';

  style: any;
  themeCSSID: string = 'themeCSS';

  constructor(private i18n: I18nService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }
  
  ngOnInit(): void {
    this.i18n.getUserSetup().subscribe({
      next: (userSetup: any) => {
        this.title = userSetup.data?.filter((val: any) => val.categoryName === 'application-title').map((val: any) => val.default)[0];
        this.appQuote = userSetup.data?.filter((val: any) => val.categoryName === 'application-quote').map((val: any) => val.default)[0];
        this.userLang = userSetup.data?.filter((val: any) => val.categoryName === 'user-language').map((val: any) => val.default)[0];
        this.userTheme = userSetup.data?.filter((val: any) => val.categoryName === 'user-theme').map((val: any) => val.default)[0];
      
        this.loadTheme(this.userTheme);
      },
      error: (err: any) => {
        console.error('Failed to load the system setup');
      }
    });
  }

  loadTheme(theme: string) {
    if (theme) {
      const themeFile = `assets/themes/${theme}.css`;
      this.style = this.renderer.createElement('link') as HTMLLinkElement;
  
      this.renderer.setProperty(this.style, 'rel', 'stylesheet');
      this.renderer.setProperty(this.style, 'href', themeFile);
      this.renderer.setProperty(this.style, 'id', this.themeCSSID);
      this.renderer.appendChild(this.document.head, this.style);
    }
  }
}
