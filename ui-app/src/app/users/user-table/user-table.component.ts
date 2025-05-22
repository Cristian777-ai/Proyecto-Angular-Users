
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="user-row">
      <span class="col id">{{ user.id }}</span>
      <span class="col name">{{ user.name }}</span>
      <span class="col email">{{ user.email }}</span>
      <button mat-icon-button color="primary" (click)="select.emit(user)">
        <mat-icon>visibility</mat-icon>
      </button>
    </div>
  `,
  styles: [`
    .user-row {
      display: flex;
      align-items: center;
      padding: 8px;
      border-bottom: 1px solid #e0e0e0;
    }
    .col {
      flex: 1;
      padding: 0 8px;
      font-size: 14px;
    }
    .id { max-width: 50px; }
    .name { font-weight: 500; }
    .email { color: #555; }
    button {
      margin-left: auto;
    }
  `]
})
export class UserTableComponent {

  @Input() user!: User;

  @Output() select = new EventEmitter<User>();
}