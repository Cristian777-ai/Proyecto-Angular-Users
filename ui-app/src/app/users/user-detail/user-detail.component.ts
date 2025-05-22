import { Component, OnInit }    from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule }          from '@angular/common';
import { MatCardModule }         from '@angular/material/card';
import { MatButtonModule }       from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserService, User }     from '../../services/user.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  template: `
    <mat-card *ngIf="!loading && !error">
      <mat-card-title>{{ user?.name }}</mat-card-title>
      <mat-card-content>
        <p><strong>Email:</strong> {{ user?.email }}</p>
        <p><strong>Edad:</strong> {{ user?.age }}</p>
      </mat-card-content>
      <button mat-button color="primary" (click)="goBack()">Volver</button>
    </mat-card>
    <div *ngIf="loading"><mat-spinner></mat-spinner></div>
    <div *ngIf="error" class="error">No se pudo cargar el usuario</div>
  `
})
export class UserDetailComponent implements OnInit {
  user!: User;
  loading = true;
  error = false;

  constructor(
    private userSvc: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (isNaN(id)) {
      this.error = true;
      this.loading = false;
      return;
    }
    this.userSvc.getById(id).subscribe({
      next: u => {
        this.user = u;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
