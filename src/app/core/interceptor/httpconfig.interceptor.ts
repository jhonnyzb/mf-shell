import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { getSession } from '../utils/encryptData';
import { DialogParams } from 'src/app/core/models/insite/dialogParams.model';
import { LoginValeproResponseModel } from 'src/app/infrastructure/dto/response/loginValeproResponse.model';
import { DialogService } from '../utils/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private dialogService: DialogService) { }


  logout() {
    localStorage.setItem('programId', sessionStorage.getItem('programId'))
    localStorage.setItem('program', sessionStorage.getItem('program'))
    localStorage.setItem('RegisterOnWebResponsive', sessionStorage.getItem('RegisterOnWebResponsive'))
    localStorage.setItem('configVisual', sessionStorage.getItem('configVisual'))
    localStorage.setItem('passwordMinlength', sessionStorage.getItem('passwordMinlength'))
    sessionStorage.clear();
    sessionStorage.setItem('program', localStorage.getItem('program'));
    sessionStorage.setItem('programId', localStorage.getItem('programId'));
    sessionStorage.setItem('RegisterOnWebResponsive', localStorage.getItem('RegisterOnWebResponsive'));
    sessionStorage.setItem('configVisual', localStorage.getItem('configVisual'));
    sessionStorage.setItem('passwordMinlength', localStorage.getItem('passwordMinlength'));
    localStorage.removeItem('program');
    localStorage.removeItem('programId');
    this.router.navigate(['/login']);
  }


  /**
   * Interceptor para la configuración de HTTP.
   *
   * @param request - La solicitud HTTP entrante.
   * @param next - El siguiente controlador de HTTP en la cadena de interceptores.
   * @returns Un Observable que emite eventos HTTP.
   *
   * @remarks
   * Este interceptor se utiliza para realizar tareas comunes antes y después de enviar una solicitud HTTP.
   *
   * @example
   * ```
   * intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   *   // Código del interceptor
   * }
   * ```
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loadingEvent = new CustomEvent('loadingEvent');
    document.dispatchEvent(loadingEvent);

    const excludeUrl = 'v2/recursos';
    if (request.url.search(excludeUrl) === -1) {
      if (!request.headers.has('Content-Type')) {
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
      }
    }

    if (request.url.includes(environment.apiValepro)) {
      if (sessionStorage.getItem('accountValepro')) {
        let tokenValepro = getSession<LoginValeproResponseModel>('accountValepro').AccessToken;
        let sessionIdValepro = getSession<LoginValeproResponseModel>('accountValepro').SessionId;
        if (tokenValepro && sessionIdValepro) {
          const modifiedHeaders = request.headers
            .set('Authorization', tokenValepro)
            .set('programId', getSession<number>('programId').toString())
            .set('SessionId', sessionIdValepro);
          const modifiedRequest = request.clone({ headers: modifiedHeaders });
          return next.handle(modifiedRequest);
        } else {
          return next.handle(request);
        }
      }
    }
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        const loadedEvent = new CustomEvent('loadedEvent');
        document.dispatchEvent(loadedEvent);
        return event;
      }),
      catchError((error: HttpErrorResponse) => {

        if (request.url.includes(environment.apiValepro)) {
          const loadedEvent = new CustomEvent('loadedEvent');
          document.dispatchEvent(loadedEvent);
          if (error.url.includes('v1/users/logout') || error.url.includes('v1/programas?IDPrograma')) {
            return throwError(() => error);
          }

          if (error.status == HttpStatusCode.Unauthorized || error.status == HttpStatusCode.Forbidden) {
            let dialogParams: DialogParams = {
              success: false,
              confirmText: "Aceptar",
              msg: undefined,
              page: undefined
            };
            this.dialogService
              .openConfirmDialog("Tu sesión se ha cerrado por inactividad", dialogParams)
            this.logout();
            this.router.navigate(['/login']);
            return throwError(() => error);
          }
          return throwError(() => error);
        }
        return throwError(() => error);
      }));

  }
}
