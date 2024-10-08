import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorResponseModel } from 'src/app/core/models/response/responseError.model';
import { ProductMapper } from 'src/app/core/mappers/product.mapper';
import { FeatureProductsModelResponse } from 'src/app/core/models/response/featureProducts.model';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { FeatureProductsResponseDto } from '../../dto/response/featureProducts.dto';
import { CatalogRepository } from 'src/app/core/repositories/catalog.repository';
import { ProductDetailByIdModel } from 'src/app/core/models/response/productDetail.model';
import { ProductByIdResponseDto } from '../../dto/response/productsById.dto';

@Injectable({
  providedIn: 'root'
})
/**
 * service catalog
 */
export class CatalogService implements CatalogRepository {

  constructor(private http: HttpClient) { }

  private baseUrl = '/award-catalogs-api/api/v1';

  /**
   * Obtiene los detalles de un producto por su ID.
   *
   * @param productId - El ID del producto.
   * @returns Un observable que emite un objeto `ResponseBaseModel` que contiene los detalles del producto.
   * Si ocurre un error, se emite un objeto `ResponseBaseModel` que contiene los detalles del error.
   */
  getProductId(productId: number): Observable<ResponseBaseModel<ProductDetailByIdModel>> {
    return this.http.get<ResponseBaseModel<ProductByIdResponseDto>>(`${environment.apiValepro}${this.baseUrl}/Awards/get-award-by-id?AwardId=${productId}`)
      .pipe(
        map(response => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: ProductMapper.mapResponseProductByIdApiToDomain(response.data)
          }
        }),
        catchError((error: HttpErrorResponse) => {
          let errorResponse: ResponseBaseModel<ErrorResponseModel[]> = {
            codeId: error.error.codeId,
            message: error.error.Message,
            data: error.error.Data
          }
          return throwError(() => errorResponse);
        }))
  }

  /**
   * Obtiene los productos destacados.
   *
   * @returns Un Observable que emite un objeto ResponseBaseModel con un array de FeatureProductsModelResponse.
   *
   * @throws Emite un error si la solicitud HTTP falla.
   */
  getFeatureProducts(): Observable<ResponseBaseModel<FeatureProductsModelResponse[]>> {
    return this.http.get<ResponseBaseModel<FeatureProductsResponseDto[]>>(`${environment.apiValepro}${this.baseUrl}/awards/featured-awards`)
      .pipe(
        map(response => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: ProductMapper.fromApiToDomainFeatureProducts(response.data)
          }
        }),
        catchError((error: HttpErrorResponse) => {
          let errorResponse: ResponseBaseModel<ErrorResponseModel[]> = {
            codeId: error.error.codeId,
            message: error.error.Message,
            data: error.error.Data
          }
          return throwError(() => errorResponse);
        }))
  }
}
