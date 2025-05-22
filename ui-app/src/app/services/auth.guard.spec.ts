
import { of }              from 'rxjs';
import { UrlTree, Router } from '@angular/router';

import { AuthGuard }       from './auth.guard';
import { AuthService }     from './auth.service';

describe('AuthGuard', () => {

  function makeGuard(isLoggedIn$ = of(true)) {
    const authSpy = jasmine.createSpyObj(
      'AuthService',
      [],                        
      { isLoggedIn$: isLoggedIn$ } 
    );

    const routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);
    routerSpy.parseUrl.and.returnValue({} as UrlTree);

    const guard = new AuthGuard(authSpy, routerSpy);
    return { guard, authSpy, routerSpy };
  }

  it('debe redirigir a /login cuando isLoggedIn$ emite false', (done) => {
    
    const { guard, authSpy, routerSpy } = makeGuard(of(false));

  
    guard.canActivate().subscribe(res => {
      expect(routerSpy.parseUrl).toHaveBeenCalledWith('/login');
      expect(res).toEqual({} as UrlTree);
      done();
    });
  });

  it('debe permitir acceso cuando isLoggedIn$ emite true', (done) => {
    
    const { guard } = makeGuard(of(true));

    guard.canActivate().subscribe(res => {
      expect(res).toBeTrue();
      done();
    });
  });

});