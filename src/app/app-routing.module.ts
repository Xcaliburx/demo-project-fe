import { ProfileComponent } from './profile/profile.component';
import { LoggedInGuard } from './auth/loggedIn.guard';
import { DeveloperGuard } from './auth/developer.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BrokerGuard } from './auth/broker.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    canActivate: [LoggedInGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'brokers',
    canActivate: [BrokerGuard],
    loadChildren: () => import('./broker/broker.module').then(m => m.BrokerModule)
  },
  {
    path: 'developers',
    canActivate: [DeveloperGuard],
    loadChildren: () => import('./developer/developer.module').then(m => m.DeveloperModule)
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
