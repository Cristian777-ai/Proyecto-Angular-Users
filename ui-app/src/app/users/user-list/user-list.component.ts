// src/app/users/user-list/user-list.component.ts
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, RouterModule }       from '@angular/router';
import { CommonModule }               from '@angular/common';
import { MatTableModule, MatTableDataSource }  from '@angular/material/table';
import { MatPaginatorModule, MatPaginator }    from '@angular/material/paginator';
import { MatCardModule }              from '@angular/material/card';
import { MatButtonModule }            from '@angular/material/button';
import { MatIconModule }              from '@angular/material/icon';
import { MatProgressSpinnerModule }   from '@angular/material/progress-spinner';

import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,              // ← si usas <mat-icon>
    MatProgressSpinnerModule
  ],
  template: `
    <mat-card class="list-card">
      <mat-card-title>Usuarios</mat-card-title>

      <div *ngIf="loading" class="spinner">
        <mat-spinner></mat-spinner>
      </div>
      <div *ngIf="error" class="error">
        No se pudieron cargar los usuarios
      </div>

      <table mat-table [dataSource]="dataSource"
             class="full-width"
             *ngIf="!loading && !error">

        <!-- ID Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef> ID </th>
          <td mat-cell        *matCellDef="let u"> {{u.id}} </td>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Nombre </th>
          <td mat-cell        *matCellDef="let u"> {{u.name}} </td>
        </ng-container>

        <!-- Email Column -->
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef> Email </th>
          <td mat-cell        *matCellDef="let u"> {{u.email}} </td>
        </ng-container>

        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef> Acciones </th>
          <td mat-cell        *matCellDef="let u">
            <button mat-icon-button color="primary"
                    (click)="viewDetails(u.id)">
              <mat-icon>visibility</mat-icon>
            </button>
          </td>
        </ng-container>

        <!-- Header and Row Declarations -->
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row        *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>

      <mat-paginator
        *ngIf="!loading && !error"
        [pageSizeOptions]="[5, 10, 20]"
        showFirstLastButtons>
      </mat-paginator>
    </mat-card>
  `,
  styles: [`
    .list-card { margin: 40px; padding: 20px; }
    .full-width { width: 100%; overflow: auto; }
    .spinner, .error { text-align: center; margin: 20px 0; }
  `]
})
export class UserListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<User>([]);
  displayedColumns = ['id','name','email','actions'];  // ← definidas aquí

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  loading = true;
  error = false;

  constructor(private userSvc: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userSvc.list().subscribe({
      next: users => {
        this.dataSource.data = users;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  viewDetails(id: number): void {
    this.router.navigate(['/users', id]);
  }
}
