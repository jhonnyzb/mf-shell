import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ProgramRequestModel } from '../../core/models/request/programRequest.model';
import { LookAndFeelRepository } from 'src/app/core/repositories/lookAndFeel.repository';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { UrlToProgramModel } from 'src/app/core/models/response/urlToProgram.model';
import { environment } from 'src/environments/environment';
import { LookAndFeelMapper } from 'src/app/core/mappers/lookAndFeel.mapper';
import { UrlToProgramDto } from '../dto/response/program.dto';
import { ResponseBaseDto } from '../dto/response/responseBase.dto';
@Injectable({
  providedIn: 'root'
})
export class LookAndFeelService implements LookAndFeelRepository {

  constructor(private http: HttpClient) { }


  /**
   * Obtiene un programa a través de una solicitud.
   *
   * @param programRequets - El objeto que contiene la información de la solicitud del programa.
   * @returns Un observable que emite un objeto ResponseBaseModel con la información del programa.
   */
  getProgram(programRequets: ProgramRequestModel): Observable<ResponseBaseModel<UrlToProgramModel>> {
    let programRequestDto = LookAndFeelMapper.programDomainToApi(programRequets)
    return this.http.post<ResponseBaseDto<UrlToProgramDto>>(environment.apiValepro + '/program-public-api/api/v1/PublicProgram/urlToProgramId', programRequestDto)
      .pipe(map((data: ResponseBaseDto<UrlToProgramDto>) => {
        return {
          codeId: data.codeId,
          message: data.message,
          data: LookAndFeelMapper.programApiToDomain(data.data)
        }
      }));
  }
}
