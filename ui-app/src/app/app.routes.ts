
import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { UserListComponent } from './users/user-list/user-list.component';
import { LoginComponent }  from './auth/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: '**', redirectTo: 'users' }
];