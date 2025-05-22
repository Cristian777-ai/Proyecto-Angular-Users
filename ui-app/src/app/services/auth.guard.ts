
import { Injectable }                 from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
}                                      from '@angular/router';
import { AuthService }                from './auth.service';
import { Observable }                 from 'rxjs';
import { map, take }                  from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

 
  canActivate(
    _route?: ActivatedRouteSnapshot,
    _state?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.auth.isLoggedIn$.pipe(
      take(1),
      map(logged => logged
        ? true
        : this.router.parseUrl('/login')
      )
    );
  }
}