// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Event
} from '@angular/router';

import { MatToolbarModule }     from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule }        from '@angular/material/icon';
import { MatButtonModule }      from '@angular/material/button';

import { LoginComponent }       from './auth/login/login.component';
import { UserListComponent }    from './users/user-list/user-list.component';
import { UserDetailComponent }  from './users/user-detail/user-detail.component';
import { AuthService }          from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,          // proporciona <router-outlet> y directivas de routing
    LoginComponent,
    UserListComponent,
    UserDetailComponent,

    MatToolbarModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <mat-sidenav-container class="app-container">
      <mat-sidenav #drawer mode="side" opened>
        <mat-nav-list>
          <a mat-list-item routerLink="/users" routerLinkActive="active">Usuarios</a>
          <a mat-list-item (click)="onLogout()">Cerrar sesión</a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button mat-icon-button (click)="drawer.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>Panel de Administración</span>
        </mat-toolbar>

        <div class="content">
          <router-outlet></router-outlet>
        </div>

        <mat-toolbar color="primary" class="footer">
          © 2025 Mi Empresa
        </mat-toolbar>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .app-container { height: 100vh; }
    .content { padding: 16px; }
    .footer { justify-content: center; font-size: 0.9em; }
    .active { font-weight: bold; }
  `]
})
export class AppComponent {
  loading = false;
  private navStart = 0;
  private readonly MIN_MS = 600;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
    this.router.events.subscribe((ev: Event) => {
      if (ev instanceof NavigationStart) {
        this.navStart = performance.now();
        this.loading = true;
      } else if (
        ev instanceof NavigationEnd ||
        ev instanceof NavigationCancel ||
        ev instanceof NavigationError
      ) {
        const elapsed = performance.now() - this.navStart;
        const remaining = this.MIN_MS - elapsed;
        if (remaining > 0) {
          setTimeout(() => this.loading = false, remaining);
        } else {
          this.loading = false;
        }
      }
    });
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
