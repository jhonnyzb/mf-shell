import { Observable } from "rxjs";


import { ResponseBaseModel } from "../models/response/responseBase.model";
import { CategoryModel } from "../models/response/categories.model";


/**
 * Interfaz abstracta que define un repositorio de categorías.
 *
 * @template T - El tipo de modelo de categoría.
 */
export abstract class CategoryRepository {
  abstract getCategories(): Observable<ResponseBaseModel<CategoryModel[]>>

}
