
import {HttpInterceptorFn,} from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { inject } from '@angular/core/primitives/di';

export const loadingInterceptor: HttpInterceptorFn = (request, next) => {
    const loadingService = inject(LoadingService);

    if (request.method === 'POST' && request.url.includes('answer')) {
        return next(request);
    }
    loadingService.show();

    return next(request).pipe(
        finalize(() => {
            loadingService.hide();
        })
    );
};
