
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
import { LoginComponent }  from './auth/login/login.component'; 
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forRoot(routes)
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Panel de Administración</span>
      <span class="spacer"></span>
      <button mat-icon-button aria-label="Cerrar sesión" (click)="onLogout()">
        <mat-icon>exit_to_app</mat-icon>
      </button>
    </mat-toolbar>

    <mat-progress-bar
      *ngIf="loading"
      mode="indeterminate"
      color="accent"
      class="global-spinner">
    </mat-progress-bar>

    <router-outlet></router-outlet>
  `,
  styles: [`
    mat-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .global-spinner {
      position: fixed;
      top: 64px;   
      left: 0;
      width: 100%;
      z-index: 1000;
    }
    router-outlet {
      display: block;
      padding: 16px;
    }
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
