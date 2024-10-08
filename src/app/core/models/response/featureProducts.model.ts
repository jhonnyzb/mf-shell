
export class FeatureProductsModelResponse {
  /**
 * Modelo de respuesta para los productos destacados.
 *
 * @param AwardId - El ID del premio.
 * @param Name - El nombre del producto.
 * @param Points - Los puntos asociados al producto.
 * @param ImageName - El nombre de la imagen del producto.
 * @param ImageUrl - La URL de la imagen del producto.
 */
  constructor(
    public AwardId: number,
    public Name: string,
    public Points: number,
    public ImageName: string,
    public ImageUrl: string,
  ) { }
}
