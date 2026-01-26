// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const userLogged = localStorage.getItem('userLogged');

  if (userLogged) {
    const userLoggedObj = JSON.parse(userLogged);

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${userLoggedObj.access_token}`,
      },
    });
  }

  return next(request);
};
