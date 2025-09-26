import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { SquadraDetail } from './pages/squadra-detail/squadra-detail';
import { CalciatoreDetail } from './pages/calciatore-detail/calciatore-detail';
import {StaffDetail} from './pages/staff-detail/staff-detail';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'squadra/:teamId',
    component: SquadraDetail
  },
  {
    path: 'calciatore-detail',
    component: CalciatoreDetail
  },
  {
    path: 'staff-detail',
    component: StaffDetail
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
