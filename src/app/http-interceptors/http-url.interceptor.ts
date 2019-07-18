import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpUrlInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let url: string;
    let contentType = request.headers.get('Content-Type');

    if (request.url.indexOf('/assets') !== 0) {
      url = environment.backendApi + request.url;
    } else {
      url = environment.frontApi + request.url;
    }

    if (!contentType) {
      contentType = 'application/json';
    }

    const headers = new HttpHeaders({
      'Content-Type': contentType
    });

    const cloneReq = request.clone({ url, headers });

    return next.handle(cloneReq);
  }
}
