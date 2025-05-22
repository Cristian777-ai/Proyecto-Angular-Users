
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  template: `
    <div class="detail-container">
      <div *ngIf="loading" class="spinner">
        <mat-spinner diameter="40"></mat-spinner>
      </div>
      <div *ngIf="error" class="error">{{ error }}</div>
      <mat-card *ngIf="!loading && !error && user">
        <mat-card-title>Usuario {{ user.id }}</mat-card-title>
        <mat-card-content>
          <p><strong>Nombre:</strong> {{ user.name }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button (click)="goBack()">Volver</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .detail-container { max-width: 600px; margin: 40px auto; text-align: center; }
    .spinner { padding: 20px; }
    .error { color: #c00; padding: 20px; }
  `]
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private svc: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.error = null;
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!isNaN(id)) {
      this.svc.getById(id).subscribe({
        next: u => {
          this.user = u;
          this.loading = false;
        },
        error: () => {
          this.error = 'No se pudo cargar el usuario';
          this.loading = false;
        }
      });
    } else {
      this.error = 'ID de usuario inválido';
      this.loading = false;
    }
  }

  goBack(): void {
    window.history.back();
  }
}