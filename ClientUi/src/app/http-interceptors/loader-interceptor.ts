import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';


@Injectable()

export class LoaderInterceptor implements HttpInterceptor {

    public constructor(
        private loaderService: LoaderService
    ) { }

    requestCounter = 0;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.state = 1;
        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.onEnd();
            }
        },
            (err: any) => {
                this.onEnd();
            }));
    }

    onEnd() {
        this.loaderService.state = 0
    }
}
