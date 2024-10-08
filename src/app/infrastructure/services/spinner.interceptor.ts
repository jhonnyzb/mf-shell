import { SpinnerService } from './spinner.service';
import { Observable, finalize } from 'rxjs';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
/**
 * Interceptor que muestra un spinner mientras se realizan las peticiones HTTP.
 *
 * @param spinnerService - El servicio encargado de mostrar y ocultar el spinner.
 * @returns Un observable que emite eventos HTTP.
 */
export class SpinnerIntercetor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    return next.handle(request).pipe(
      finalize(() => this.spinnerService.hide()));
  }
}
