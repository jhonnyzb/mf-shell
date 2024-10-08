import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { getSession } from "src/app/core/utils/encryptData";
import { CuentasDto } from "../../dto/valefiel/cuentas.dto";
import { ProgramDto } from "../../dto/valefiel/programsResponse.dto";


@Injectable({
  providedIn: "root",
})
export class NotificationService {

  firebaseApp: any;
  messaging: any;
  program = getSession<ProgramDto>('program');
  account = getSession<CuentasDto>('account');
  key!: string;


  constructor(
    private http: HttpClient
  ) {
  }
  /**
   * Agrega el encabezado de la clave de API a las cabeceras de la solicitud.
   *
   * @returns Las cabeceras de la solicitud con el encabezado de la clave de API agregado.
   */
  addApiKeyHeader() {
    const headers = new HttpHeaders().set("x-api-key", environment.apiKey);
    return { headers: headers };
  }


  /**
   * Obtiene las notificaciones para una cuenta específica.
   *
   * @param accountId - El ID de la cuenta para la cual se obtendrán las notificaciones.
   * @returns Un Observable que emite las notificaciones obtenidas.
   */
  getNotifications(accountId: number): Observable<any> {
    let options = this.addApiKeyHeader();
    let programId: number = this.program.IDPrograma;
    let notificationType = 1;
    return this.http.get(
      `${environment.serverNotification
      }notifications/${accountId}?programId=${programId}&stateId=${-1}&notificationType=${notificationType}`,
      options
    );
  }

  /**
   * Actualiza las notificaciones.
   *
   * @param data - Los datos para actualizar las notificaciones.
   * @returns Un observable que emite la respuesta de la solicitud HTTP.
   */
  updateNotifications(data: any): Observable<any> {
    let options = this.addApiKeyHeader();
    return this.http.post(
      `${environment.serverNotification}notifications`,
      data,
      options
    );
  }
}
