import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

import { CategoryModel } from 'src/app/core/models/response/categories.model';

import { environment } from 'src/environments/environment';
import { ErrorResponseModel } from 'src/app/core/models/response/responseError.model';

import { CategoryDto } from '../dto/response/categories.dto';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { CategoryRepository } from 'src/app/core/repositories/category.repository';
import { CategoryMapper } from 'src/app/core/mappers/category.mapper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements CategoryRepository {

  http: HttpClient = inject(HttpClient);
  private baseUrl2 = '/award-catalogs-api/api/v1';

  /**
   * Obtiene las categorías.
   *
   * @returns Un observable que emite un objeto ResponseBaseModel con un array de CategoryModel.
   *
   * @throws Un error si la solicitud HTTP falla.
   */
  getCategories(): Observable<ResponseBaseModel<CategoryModel[]>> {
    return this.http.get<ResponseBaseModel<CategoryDto[]>>(`${environment.apiValepro}${this.baseUrl2}/Category/get-categories`).pipe(
      map((response: ResponseBaseModel<CategoryDto[]>) => {
        return {
          codeId: response.codeId,
          message: response.message,
          data: CategoryMapper.fromApiToDomainCategories(response.data)
        }
      }),
      catchError((error: HttpErrorResponse) => {
        const errorResponse: ResponseBaseModel<ErrorResponseModel[]> = {
          codeId: error.error.codeId,
          message: error.error.message,
          data: error.error.data
        }
        return throwError(() => errorResponse);
      }));
  };


}





