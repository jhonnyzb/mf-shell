

import { CategoryDto } from "src/app/infrastructure/dto/response/categories.dto";
import { CategoryModel } from "../models/response/categories.model";


/**
 * Convierte un array de objetos de tipo CategoryDto a un array de objetos de tipo CategoryModel.
 *
 * @param dto - El array de objetos de tipo CategoryDto a convertir.
 * @returns El array de objetos de tipo CategoryModel convertido.
 */
export class CategoryMapper {

  static fromApiToDomainCategories(dto: CategoryDto[]): CategoryModel[] {
    const categories: CategoryModel[] = dto.map((item, i) => {
      return {
        CategoryId: item.categoryId,
        Name: item.name,
        IconName: item.iconName,
        ProgramId: item.programId
      }
    })
    return categories;
  }
}
