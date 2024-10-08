import { Observable } from "rxjs";
import { FilterProductsModel } from "../models/request/filterProducts.model";
import { ResponseBaseModel } from "../models/response/responseBase.model";
import { ProductsModel } from "../models/response/products.model";
import { ProductDetailByIdModel } from "../models/response/productDetail.model";


/**
 * Interfaz abstracta que define los métodos para acceder a los productos.
 */
export abstract class ProductRepository {
  /**
 * Obtiene una lista de productos filtrados según los criterios proporcionados.
 *
 * @param {FilterProductsModel} data - Los criterios de filtrado para obtener los productos.
 * @returns {Observable<ResponseBaseModel<ProductsModel>>} Un observable que emite una lista de productos filtrados.
 */
  abstract getProducts(data: FilterProductsModel): Observable<ResponseBaseModel<ProductsModel>>;
  /**
 * Obtiene los detalles de un producto por su ID.
 *
 * @param {number} productId - El ID del producto que se desea obtener.
 * @returns {Observable<ResponseBaseModel<ProductDetailByIdModel>>} Un observable que emite los detalles del producto.
 */
  abstract getProductId(productId: number): Observable<ResponseBaseModel<ProductDetailByIdModel>>;
}
