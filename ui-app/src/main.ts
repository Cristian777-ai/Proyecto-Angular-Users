
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  Routes
} from '@angular/router';
import { provideHttpClient }    from '@angular/common/http';
import { provideAnimations }    from '@angular/platform-browser/animations';

import { AppComponent }         from './app/app.component';
import { LoginComponent }       from './app/auth/login/login.component';
import { UserListComponent }    from './app/users/user-list/user-list.component';
import { UserDetailComponent }  from './app/users/user-detail/user-detail.component';
import { AuthGuard }            from './app/services/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: '',         redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',    component: LoginComponent },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/:id',
    component: UserDetailComponent,
    canActivate: [AuthGuard]
  },
  { path: '**',       redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [
    // registra el router standalone
    provideRouter(routes)
  ]
})
.catch(err => console.error(err));
