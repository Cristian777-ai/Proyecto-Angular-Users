
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }                       from '@angular/platform-browser';
import { UserTableComponent, User } from './user-table.component';
import { MatButtonModule }         from '@angular/material/button';
import { MatIconModule }           from '@angular/material/icon';

describe('UserTableComponent', () => {
  let fixture: ComponentFixture<UserTableComponent>;
  let component: UserTableComponent;

  const testUser: User = {
    id: 42,
    name: 'Test User',
    email: 'test@example.com'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserTableComponent,
     
        MatButtonModule,
        MatIconModule
      ]
    }).compileComponents();

    fixture   = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
  
    component.user = testUser;
    fixture.detectChanges();
  });

  it('debe mostrar id, nombre y email en la fila', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('42');
    expect(text).toContain('Test User');
    expect(text).toContain('test@example.com');
  });

  it('debe emitir el evento select con el usuario al pulsar el botón', () => {
 
    spyOn(component.select, 'emit');


    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', null);

    expect(component.select.emit).toHaveBeenCalledWith(testUser);
  });
});