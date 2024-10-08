import { Observable } from 'rxjs';
import { ResponseBaseModel } from '../models/response/responseBase.model';
import { UrlToProgramModel } from '../models/response/urlToProgram.model';
import { ProgramRequestModel } from '../models/request/programRequest.model';

/**
 * Clase abstracta que representa un repositorio de apariencia visual.
 *
 * @remarks
 * Este repositorio proporciona métodos para obtener información sobre la apariencia visual de un programa.
 */
export abstract class LookAndFeelRepository {
  abstract getProgram(programRequets: ProgramRequestModel): Observable<ResponseBaseModel<UrlToProgramModel>>
}
