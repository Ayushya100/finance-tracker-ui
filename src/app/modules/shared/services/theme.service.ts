import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  style: any;
  private themeCSSID: string = 'themeCSS';
  private renderer: Renderer2;

  private userLang$ = new BehaviorSubject<string | null>(null);
  private userTheme$ = new BehaviorSubject<string | null>(null);
  private backgroundImgSubject = new BehaviorSubject<string | null>(null);
  backgroundImg$ = this.backgroundImgSubject.asObservable();

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  loadSystemSetup(userSetup: any) {
    const userLang = userSetup?.filter((val: any) => val.categoryName === 'user-language').map((val: any) => val.value)[0];
    const userTheme = userSetup?.filter((val: any) => val.categoryName === 'user-theme').map((val: any) => val.value)[0];
    const backgroundImg = userTheme ? `assets/img/${userTheme}-bg.jpg` : 'assets/img/light-blue-bg.jpg';

    const currentUserLang = this.userLang$.getValue();
    const currentUserTheme = this.userTheme$.getValue();
    const currentBackgroundImg = this.backgroundImgSubject.getValue();

    if (currentUserLang !== userLang) {
      this.userLang$.next(userLang);
    }
    if (currentUserTheme !== userTheme) {
      this.userTheme$.next(userTheme);
      this.loadTheme(userTheme);
    }
    if (currentBackgroundImg !== backgroundImg) {
      this.backgroundImgSubject.next(backgroundImg);
    }
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

  get userTheme() {
    return this.userTheme$.asObservable();
  }

  get userLang() {
    return this.userLang$.asObservable();
  }

}
