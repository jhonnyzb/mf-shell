
/**
 * Interfaz que representa la respuesta de un producto por su ID.
 * @param award - Detalles del producto.
 */
export interface ProductByIdResponseDto {
  award: ProductDetailDto,
}

/**
 * Interfaz que representa los detalles de un producto.
 *
 * @param awardId - El ID del premio.
 * @param awardIdERP - El ID del premio en el sistema ERP.
 * @param code - El código del producto.
 * @param type - El tipo de producto.
 * @param secondaryCode - El código secundario del producto.
 * @param supplierReference - La referencia del proveedor.
 * @param status - El estado del producto.
 * @param shortName - El nombre corto del producto.
 * @param longName - El nombre largo del producto.
 * @param description - La descripción del producto.
 * @param brandId - El ID de la marca del producto.
 * @param brandName - El nombre de la marca del producto.
 * @param costCenterId - El ID del centro de costos del producto.
 * @param weight - El peso del producto.
 * @param categoryName - El nombre de la categoría del producto.
 * @param categoryId - El ID de la categoría del producto.
 * @param color - El color del producto.
 * @param programId - El ID del programa del producto.
 * @param cost - El costo del producto.
 * @param points - Los puntos del producto.
 * @param combo - Indica si el producto es un combo.
 * @param observations - Las observaciones del producto.
 * @param warrantyNotes - Las notas de garantía del producto.
 * @param productCharacteristics - Las características del producto.
 * @param profitabilityPercentage - El porcentaje de rentabilidad del producto.
 * @param energizerCatalogue - Indica si el producto está en el catálogo de Energizer.
 * @param feature - Indica si el producto es una característica.
 * @param productClass - La clase del producto.
 * @param category - La categoría del producto.
 * @param awardImages - Las imágenes del producto.
 * @param productClassAuxiliaryMessage - El mensaje auxiliar de la clase del producto.
 */
export interface ProductDetailDto {
  awardId: number,
  awardIdERP: number,
  code: string,
  type: string,
  secondaryCode: string,
  supplierReference: string,
  status: boolean,
  shortName: string,
  longName: string,
  description: string,
  brandId: string,
  brandName: string,
  costCenterId: string,
  weight: number,
  categoryName: string,
  categoryId: number,
  color: string,
  programId: number,
  cost: number,
  points: number,
  combo: boolean,
  observations: string,
  warrantyNotes: string,
  productCharacteristics: ProductCharacteristicDto[],
  profitabilityPercentage: number,
  energizerCatalogue: boolean,
  feature: boolean,
  productClass: number,
  category: CategoryDto,
  awardImages: ProductImageDto[],
  productClassAuxiliaryMessage: string,
}

/**
 * Interfaz que representa los datos de una categoría.
 *
 * @param categoryId - El ID de la categoría.
 * @param name - El nombre de la categoría.
 * @param iconName - El nombre del icono de la categoría.
 * @param programId - El ID del programa asociado a la categoría.
 */
export interface CategoryDto {
  categoryId: number,
  name: string,
  iconName: string,
  programId: number,
}

/**
 * Interfaz que representa los datos de una imagen de producto.
 * @param awardImageId - El ID de la imagen del premio.
 * @param awardId - El ID del premio.
 * @param imageName - El nombre de la imagen.
 * @param imagePath - La ruta de la imagen.
 */
export interface ProductImageDto {
  awardImageId: number,
  awardId: number,
  imageName: string,
  imagePath: string,
}


/**
 * Interfaz que representa los datos de las características de un producto.
 *
 * @param id - El identificador de la característica.
 * @param name - El nombre de la característica.
 * @param value - El valor de la característica.
 */
export interface ProductCharacteristicDto {
  id: number,
  name: string,
  value: string,
}
