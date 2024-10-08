import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardRepository } from '../../core/repositories/board.repository';
import { ResponseBaseModel } from '../../core/models/response/responseBase.model';
import { ListBoardsResponseModel } from '../../core/models/response/listBoardsResponse.model';
import { ListBoardsRequestModel } from '../../core/models/request/listBoardRequest.model';
import { ListBoardsRequestDto } from '../dto/request/listBoardRequest.dto';
import { BoardsMapper } from '../../core/mappers/boards.mapper';
import { ListBoardsResponseDto } from '../dto/response/listBoardResponse.dto';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BoardService implements BoardRepository {
  private baseUrl = '/board-api/api/v1/board';

  http: HttpClient = inject(HttpClient);

  /**
   * Obtiene una lista de tableros según los parámetros especificados.
   *
   * @param params - Los parámetros de solicitud para filtrar la lista de tableros.
   * @returns Un observable que emite un objeto ResponseBaseModel con una lista de tableros.
   */
  listBoards(params: ListBoardsRequestModel): Observable<ResponseBaseModel<ListBoardsResponseModel>> {
    const boardParams: ListBoardsRequestDto = BoardsMapper.listBoardFromDomainToApi(params);
    const url = `${environment.apiValepro}${this.baseUrl}/by-type-and-program`;
    return this.http.post<ResponseBaseModel<ListBoardsResponseDto>>(url, boardParams);
  }


}
