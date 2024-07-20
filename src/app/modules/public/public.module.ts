import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { IndexModule } from './modules/index/index.module';

// Components
import { CoreComponent } from './components/core/core.component';

// Service
import { PublicService } from './services/public.service';

@NgModule({
  declarations: [
    CoreComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    IndexModule
  ],
  providers: [
    PublicService
  ]
})
export class PublicModule { }
