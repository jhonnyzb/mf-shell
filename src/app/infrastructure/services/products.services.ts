import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { FilterProductsModel } from 'src/app/core/models/request/filterProducts.model';
import { ProductsModel } from 'src/app/core/models/response/products.model';
import { environment } from 'src/environments/environment';
import { ErrorResponseModel } from 'src/app/core/models/response/responseError.model';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { ProductRepository } from 'src/app/core/repositories/products.repository';
import { ProductMapper } from 'src/app/core/mappers/product.mapper';
import { ProductsDto } from '../dto/response/products.dto';
import { ProductDetailByIdModel } from 'src/app/core/models/response/productDetail.model';
import { ProductByIdResponseDto } from '../dto/response/productsById.dto';


@Injectable({
  providedIn: 'root'
})
export class ProductService implements ProductRepository {

  constructor(private http: HttpClient) { }

  private baseUrl = '/award-catalogs-api/api/v1';


  /**
   * Obtiene los productos según los filtros especificados.
   *
   * @param data - Los datos del filtro de productos.
   * @returns Un observable que emite un objeto ResponseBaseModel con los productos obtenidos.
   * @throws Un error si ocurre un problema durante la solicitud HTTP.
   */
  getProducts(data: FilterProductsModel): Observable<ResponseBaseModel<ProductsModel>> {
    const dataSend = ProductMapper.fromDomainToApi(data);
    return this.http.post<ResponseBaseModel<ProductsDto>>(`${environment.apiValepro}${this.baseUrl}/Awards/get-awards-paginated-by-filter`, dataSend)
      .pipe(
        map(response => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: ProductMapper.fromApiToDomain(response.data)
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
   * Obtiene los detalles de un producto por su ID.
   *
   * @param productId - El ID del producto a obtener.
   * @returns Un observable que emite un objeto ResponseBaseModel con los detalles del producto.
   * @throws Un error si la solicitud falla o si ocurre un error en el servidor.
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


}
