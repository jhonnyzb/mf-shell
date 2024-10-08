
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeatureProductsModelResponse } from '../models/response/featureProducts.model';
import { ResponseBaseModel } from '../models/response/responseBase.model';
import { ProductDetailByIdModel } from '../models/response/productDetail.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Repositorio abstracto para el catálogo.
 */
export abstract class CatalogRepository {
  /**
 * Obtiene los detalles de un producto por su ID.
 *
 * @param {number} productId - El ID del producto que se desea obtener.
 * @returns {Observable<ResponseBaseModel<ProductDetailByIdModel>>} Un observable que emite los detalles del producto.
 */
  abstract getProductId(productId: number): Observable<ResponseBaseModel<ProductDetailByIdModel>>;
  /**
 * Obtiene una lista de productos destacados.
 *
 * @returns {Observable<ResponseBaseModel<FeatureProductsModelResponse[]>>} Un observable que emite una lista de productos destacados.
 */
  abstract getFeatureProducts(): Observable<ResponseBaseModel<FeatureProductsModelResponse[]>>;
}
