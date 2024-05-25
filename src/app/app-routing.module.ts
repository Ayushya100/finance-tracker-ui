import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Route Modules
import { publicRoutes } from './modules/public/public.routes';
import { userRoutes } from './modules/user/user.routes';
import { sharedRoutes } from './modules/shared/shared.routes';

const routes: Routes = [
  ...userRoutes,
  ...publicRoutes,
  ...sharedRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
