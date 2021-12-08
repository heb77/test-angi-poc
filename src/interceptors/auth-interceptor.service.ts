import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const modifiedRequest = req.clone({
/*             headers: req.headers.append('Content-Type', 'application/json') */
        });
        return next.handle(modifiedRequest);
    }
}