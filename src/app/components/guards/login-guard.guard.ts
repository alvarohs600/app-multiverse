import { inject } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';

export const loginGuardGuard: CanActivateFn = (route, state) => {
 const router= inject(Router);
 const auth= getAuth();

 return new Observable<boolean>((subscriber) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      subscriber.next(true);
      subscriber.complete();
    } else {
      router.navigate(['/login']);
      subscriber.next(false);
      subscriber.complete();
    }
  });
});
};