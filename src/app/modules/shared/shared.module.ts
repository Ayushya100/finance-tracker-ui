import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

// Components
import { FormPopupComponent } from './components/form-popup/form-popup.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MessagePopupComponent } from './components/message-popup/message-popup.component';
import { UnderDevelopmentComponent } from './components/under-development/under-development.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { NotificationPopupComponent } from './components/notification-popup/notification-popup.component';

// Services
import { I18nService } from './services/i18n.service';
import { NotificationService } from './services/notification.service';
import { LoaderService } from './services/loader.service';

// Modules
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav'; 

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    FormPopupComponent,
    LoaderComponent,
    MessagePopupComponent,
    UnderDevelopmentComponent,
    NoAccessComponent,
    NotificationPopupComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSidenavModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    I18nService,
    NotificationService,
    LoaderService
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSidenavModule,
    LoaderComponent,
    UnderDevelopmentComponent,
    NoAccessComponent
  ]
})
export class SharedModule { }
