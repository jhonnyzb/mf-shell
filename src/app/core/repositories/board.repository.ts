import { Observable } from 'rxjs';
import { ResponseBaseModel } from '../models/response/responseBase.model';
import { ListBoardsResponseModel } from '../models/response/listBoardsResponse.model';
import { Injectable } from '@angular/core';
import { ListBoardsRequestModel } from '../models/request/listBoardRequest.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Interfaz abstracta que define los métodos para acceder a los datos de los tableros.
 */
/**
 * Clase abstracta que representa un repositorio de tableros.
 *
 * @template T - El tipo de modelo de solicitud para listar tableros.
 * @template U - El tipo de modelo de respuesta para listar tableros.
 */
export abstract class BoardRepository {
  abstract listBoards(params: ListBoardsRequestModel): Observable<ResponseBaseModel<ListBoardsResponseModel>>;
}
