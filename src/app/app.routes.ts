import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { SquadraDetail } from './pages/squadra-detail/squadra-detail';
import { CalciatoreDetail } from './pages/calciatore-detail/calciatore-detail';
import { StaffDetail } from './pages/staff-detail/staff-detail';
import { Login } from './pages/login/login';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard' // <-- slash davanti
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: 'squadra/:teamId',
    component: SquadraDetail,
    canActivate: [authGuard]
  },
  {
    path: 'calciatore-detail',
    component: CalciatoreDetail,
    canActivate: [authGuard]
  },
  {
    path: 'staff-detail',
    component: StaffDetail,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/dashboard' // <-- anche qui slash davanti
  }
];
