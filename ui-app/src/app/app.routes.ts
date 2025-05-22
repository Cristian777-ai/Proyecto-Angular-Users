import { Routes } from '@angular/router';
import { LoginComponent }          from './auth/login/login.component';
import { UserListComponent }       from './users/user-list/user-list.component';
import { UserDetailComponent }     from './users/user-detail/user-detail.component';
import { AuthGuard }               from './services/auth.guard';

export const routes: Routes = [
  { path: 'login',    component: LoginComponent },
  { path: 'users',    component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'users/:id',component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
