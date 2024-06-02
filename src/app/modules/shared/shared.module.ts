import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { FormPopupComponent } from './components/form-popup/form-popup.component';
import { LoaderComponent } from './components/loader/loader.component';

// Services
import { I18nService } from './services/i18n.service';
import { NotificationService } from './services/notification.service';
import { LoaderService } from './services/loader.service';

// Modules
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MessagePopupComponent } from './components/message-popup/message-popup.component';

@NgModule({
  declarations: [
    FormPopupComponent,
    LoaderComponent,
    MessagePopupComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    MatSidenavModule,
    MatTabsModule,
    MatDialogModule
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
    MatSidenavModule,
    MatTabsModule,
    LoaderComponent
  ]
})
export class SharedModule { }
