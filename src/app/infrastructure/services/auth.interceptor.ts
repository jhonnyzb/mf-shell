import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DialogParams } from 'src/app/core/models/insite/dialogParams.model';
import { DialogService } from 'src/app/core/utils/dialog.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private dialogService: DialogService
  ) { }

  /**
   * Interceptor para autenticación.
   *
   * Intercepta las solicitudes HTTP y maneja los errores de autenticación.
   * Si el estado de error es 401 o 403, se realiza una solicitud de cierre de sesión al servidor.
   *
   * @param req - La solicitud HTTP entrante.
   * @param next - El siguiente controlador de HTTP en la cadena de interceptores.
   * @returns Un observable que emite eventos HTTP.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          const apiLogout = `${environment.apiValepro}/auth-user-api/api/v1/login/logout-user`;
          if (req.url !== apiLogout) this.handleAuthError(error.status);
        }
        return throwError(() => error);
      })
    );
  }

  /**
   * Maneja los errores de autenticación.
   *
   * @param status - El estado del error de autenticación.
   * @returns void
   */
  private handleAuthError(status: number): void {
    if (status === 401) {
      let dialogParams: DialogParams = {
        success: false,
        confirmText: "Ok",
        msg: "Tu sesión ha expirado por inactividad. Por favor, vuelve a iniciar sesión.",
        page: undefined
      };
      this.dialogService.openCloseSessionDialog(dialogParams);
      this.router.navigate(['/login']);
    } else if (status === 403) {
      let dialogParams: DialogParams = {
        success: false,
        confirmText: "Ok",
        msg: "Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.",
        page: undefined
      };
      this.dialogService.openCloseSessionDialog(dialogParams);
      this.router.navigate(['/login']);
    }
  }
}
