import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  return next(request).pipe(
    catchError((error) => {
      if (error.status === 401) {
        localStorage.removeItem('userLogged');
        window.location.reload();
      }
      return throwError(() => error);
    })
  );
};
