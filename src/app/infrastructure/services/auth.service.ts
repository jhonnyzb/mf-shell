import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { ErrorResponseModel } from 'src/app/core/models/response/responseError.model';
import { AuthRepository } from 'src/app/core/repositories/auth.repository';


/**
 * Servicio de autenticación.
 *
 * @remarks
 * Este servicio se encarga de manejar el cierre de sesión.
 * @class AuthService
 * @implements AuthRepository
 * @public
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthRepository {

  http = inject(HttpClient);



  /**
   * Cierra la sesión de un usuario autenticado.
   *
   * @returns Un observable que emite una respuesta con el código de identificación, los datos de cierre de sesión y el mensaje.
   */
  logoutUserAuth(): Observable<ResponseBaseModel<null>> {
    return this.http.delete<ResponseBaseModel<null>>(`${environment.apiValepro}/auth-user-api/api/v1/login/logout-user`).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorResponse: ResponseBaseModel<ErrorResponseModel[]> = {
          codeId: error.error.CodeId,
          message: error.error.Message,
          data: error.error.Data
        }
        return throwError(() => errorResponse);
      })
    );
  };


}
