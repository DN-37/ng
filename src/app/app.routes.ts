import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DevicesComponent } from './devices/devices.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'devices',
    component: DevicesComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/devices' },
];
