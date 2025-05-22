import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, RouterModule }       from '@angular/router';
import { CommonModule }               from '@angular/common';
import { MatTableModule, MatTableDataSource }  from '@angular/material/table';
import { MatPaginatorModule, MatPaginator }    from '@angular/material/paginator';
import { MatCardModule }              from '@angular/material/card';
import { MatButtonModule }            from '@angular/material/button';
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
    MatProgressSpinnerModule
  ],
  template: `
    <mat-card>
      <h2>Usuarios</h2>
      <div *ngIf="loading"><mat-spinner></mat-spinner></div>
      <div *ngIf="error" class="error">No se pudieron cargar los usuarios</div>
      <table mat-table [dataSource]="dataSource" *ngIf="!loading && !error">
        <!-- Columnas definidas aquí -->
      </table>
      <mat-paginator *ngIf="!loading && !error"
                     [pageSizeOptions]="[5,10,20]"
                     showFirstLastButtons>
      </mat-paginator>
    </mat-card>
  `
})
export class UserListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<User>([]);
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
