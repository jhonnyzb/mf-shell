import { Observable } from 'rxjs';

/**
 * Repositorio abstracto para la gestión de inactividad.
 */
export abstract class InactivityRepository {
  abstract resetTimer(): Observable<any>
}
