import { Observable } from 'rxjs';
import { ResponseBaseModel } from '../models/response/responseBase.model';


/**
 * Clase abstracta que representa un repositorio de autenticación.
 */
export abstract class AuthRepository {

  /**
   * Método abstracto para cerrar la sesión del usuario administrador.
   * @returns Un Observable que emite una instancia de ResponseBase con valor nulo.
   */
  abstract logoutUserAuth(): Observable<ResponseBaseModel<null>>

}
