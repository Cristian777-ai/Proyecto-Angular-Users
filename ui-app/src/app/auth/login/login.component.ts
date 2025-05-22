// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';      // ← nuevo
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatButtonModule }     from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,                 // ← aquí
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="login-form">
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Usuario</mat-label>
        <input matInput formControlName="username" autocomplete="username">
        <mat-error *ngIf="form.get('username')?.hasError('required')">
          El usuario es obligatorio
        </mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Contraseña</mat-label>
        <input matInput type="password" formControlName="password" autocomplete="current-password">
        <mat-error *ngIf="form.get('password')?.hasError('required')">
          La contraseña es obligatoria
        </mat-error>
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
        Ingresar
      </button>
    </form>
  `,
  styles: [/* tus estilos */]
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) { return; }

    const { username, password } = this.form.value;
    this.auth.login(username, password).subscribe({
      next: () => {
        this.snack.open('Bienvenido', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top'
        });
        this.router.navigate(['/users']);
      },
      error: err => {
        const msg = err.status === 401
          ? 'Credenciales inválidas'
          : 'Error en el servidor';
        this.snack.open(msg, 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    });
  }
}
