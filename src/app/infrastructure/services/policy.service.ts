import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PolicyAcceptanceRequestModel } from '../../core/models/request/policyRequest.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ResponseBaseModel } from '../../core/models/response/responseBase.model';
import { PolicyConfigFormMapper } from '../../core/mappers/policyConfigForm.mapper';
import { PolicyRepository } from '../../core/repositories/policy.repository';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PolicyService implements PolicyRepository {
  http: HttpClient = inject(HttpClient);

  /**
   * Actualiza la aceptación de la política.
   *
   * @param data - Los datos de la solicitud de aceptación de la política.
   * @returns Un observable que emite un objeto ResponseBaseModel con los datos de la respuesta.
   * @throws Un objeto ResponseBaseModel con los detalles del error en caso de que ocurra un error durante la solicitud.
   */
  updatePolicyAcceptance(data: PolicyAcceptanceRequestModel): Observable<ResponseBaseModel<any>> {
    let request = PolicyConfigFormMapper.policyAcceptanceConfirmFormDomainToApi(data)
    return this.http.put<ResponseBaseModel<null>>(`${environment.apiValepro}/auth-user-api/api/v1/user/policy-acceptance`, request)
      .pipe(
        map((data: ResponseBaseModel<any>) => {
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new ResponseBaseModel(
            error.error.CodeId,
            error.error.Message,
            error.error.Data
          ))
        })
      );
  }
}
