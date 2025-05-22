
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { UserListComponent } from './user-list.component';
import { UserService, User } from '../../services/user.service';

describe('UserListComponent', () => {
  let fixture: ComponentFixture<UserListComponent>;
  let comp: UserListComponent;
  let httpMock: HttpTestingController;
  let router: Router;

  const mockUsers: User[] = [
    { id: 1, name: 'Alice', email: 'a@x.com' },
    { id: 2, name: 'Bob',   email: 'b@x.com' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserListComponent,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ]
    }).compileComponents();

    fixture  = TestBed.createComponent(UserListComponent);
    comp     = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    router   = TestBed.inject(Router);
  });

  afterEach(() => httpMock.verify());

  it('carga dos usuarios en el dataSource', fakeAsync(() => {
   
    fixture.detectChanges();

   
    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
    tick();
    fixture.detectChanges();

   
    expect(comp.dataSource.data.length).toBe(2);
    expect(comp.dataSource.data).toEqual(mockUsers);

    
    const tableText = fixture.debugElement.query(By.css('table')).nativeElement.textContent;
    expect(tableText).toContain('Alice');
    expect(tableText).toContain('Bob');
  }));

  it('muestra mensaje de error al fallar la carga', fakeAsync(() => {
    fixture.detectChanges();
    const req = httpMock.expectOne('http://localhost:3000/users');
    req.flush({}, { status: 500, statusText: 'Server Error' });
    tick();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.error'))).toBeTruthy();
    expect(comp.dataSource.data.length).toBe(0);
   
    expect(fixture.debugElement.query(By.css('table'))).toBeFalsy();
  }));

  it('navega al detalle al pulsar Ver', fakeAsync(() => {
    fixture.detectChanges();
    const req = httpMock.expectOne('http://localhost:3000/users');
    req.flush(mockUsers);
    tick();
    fixture.detectChanges();

    spyOn(router, 'navigate');
  
    const btn = fixture.debugElement.query(By.css('button[mat-icon-button]'));
    btn.triggerEventHandler('click', null);
    tick();

    expect(router.navigate).toHaveBeenCalledWith(['/users', mockUsers[0].id]);
  }));
});