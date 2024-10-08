/**
 * Interfaz que representa la respuesta de los productos destacados.
 * @param awardId - El ID del premio.
 * @param name - El nombre del producto.
 * @param points - Los puntos del producto.
 * @param imageName - El nombre de la imagen del producto.
 * @param imageUrl - La URL de la imagen del producto.
 */
export interface FeatureProductsResponseDto {
  awardId: number,
  name: string,
  points: number,
  imageName: string,
  imageUrl: string
}
