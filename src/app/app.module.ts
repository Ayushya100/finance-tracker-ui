import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { PublicModule } from './modules/public/public.module';
import { UserModule } from './modules/user/user.module';

import { BASE_PATH } from './app.tokens';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    PublicModule,
    UserModule
  ],
  providers: [
    { provide: BASE_PATH, useValue: environment.serverURI }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
