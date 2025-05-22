import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule }     from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './services/auth.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule,
        MatToolbarModule,
        MatProgressBarModule,
        HttpClientTestingModule
      ],
      providers: [AuthService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});