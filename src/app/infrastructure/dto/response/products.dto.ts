/**
 * Interfaz que representa los datos de los productos.
 * @param awards - Información de los premios del producto.
 */
export interface ProductsDto {
  awards: ProductInfoDto
}

/**
 * Interfaz que representa la respuesta de información de productos.
 * @param data - Arreglo de objetos de tipo ProductDto que contiene la información de los productos.
 * @param pagination - Objeto que representa la paginación de los resultados. Actualmente se encuentra nulo.
 */
export interface ProductInfoDto {
  data: ProductDto[]
  pagination: null
}

/**
 * Interfaz que representa un producto.
 * @param awardId - El ID del premio.
 * @param name - El nombre del producto.
 * @param points - Los puntos del producto.
 * @param imageName - El nombre de la imagen del producto.
 * @param imagePath - La ruta de la imagen del producto.
 */
export interface ProductDto {
  awardId: number
  name: string
  points: number
  imageName: string
  imagePath: string
}
