
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule }            from '@angular/common';
import { RouterModule, Router }    from '@angular/router';
import { MatCardModule }           from '@angular/material/card';
import { MatTableModule }          from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatButtonModule }         from '@angular/material/button';
import { MatIconModule }           from '@angular/material/icon';
import { MatProgressSpinnerModule }from '@angular/material/progress-spinner';
import { MatTableDataSource }      from '@angular/material/table';

import { UserService, User }       from '../../services/user.service';

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
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <mat-card class="list-card">
      <mat-card-title>Usuarios</mat-card-title>

      <div *ngIf="loading" class="spinner-container">
        <mat-spinner diameter="50"></mat-spinner>
      </div>
      <div *ngIf="error" class="error">{{ error }}</div>

      <table mat-table [dataSource]="dataSource"
             class="full-width"
             *ngIf="!loading && !error">

        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>ID</th>
          <td mat-cell        *matCellDef="let u">{{u.id}}</td>
        </ng-container>

        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Nombre</th>
          <td mat-cell        *matCellDef="let u">{{u.name}}</td>
        </ng-container>

        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef>Email</th>
          <td mat-cell        *matCellDef="let u">{{u.email}}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Acciones</th>
          <td mat-cell        *matCellDef="let u">
            <button mat-icon-button color="primary"
                    (click)="viewDetails(u.id)">
              <mat-icon>visibility</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedCols"></tr>
        <tr mat-row        *matRowDef="let row; columns: displayedCols;"></tr>
      </table>

      <mat-paginator
        *ngIf="!loading && !error"
        [pageSizeOptions]="[5, 10, 20]"
        showFirstLastButtons>
      </mat-paginator>
    </mat-card>
  `,
  styles: [`
    .list-card { margin: 40px auto; padding: 24px; max-width:800px; }
    .full-width { width: 100%; margin-bottom:16px; }
    .spinner-container { text-align:center; padding:32px 0; }
    .error { color: red; text-align:center; padding:16px 0; }
  `]
})
export class UserListComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  displayedCols = ['id','name','email','actions'];
  dataSource = new MatTableDataSource<User>([]);
  loading = false;
  error: string|null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  viewDetails(id: number) {
    this.router.navigate(['/users', id]);
  }
}
