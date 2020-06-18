import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // if (this.authService.isAuth) {
    //   return true;
    // } else {
    //   this.router.navigate(['/auth/signIn']);
    // }

    return Observable.create(
      (observer) => {
        this.authService.isAuth$.subscribe(
          (auth) => {
            if (!auth) {
              this.router.navigate(['/auth/signin']);
            }
            // WORKS LIKE ELSE, isAuth to true ?
            observer.next(true);
          }
        );
      }
    );

  }

}
