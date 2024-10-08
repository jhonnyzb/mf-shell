
export class CartModel {
  /**
 * Modelo de carrito.
 *
 * @param AwardId - El ID del premio.
 * @param LongName - El nombre largo del premio.
 * @param ShortName - El nombre corto del premio.
 * @param Description - La descripción del premio.
 * @param Cost - El costo del premio.
 * @param Points - Los puntos del premio.
 * @param Observations - Las observaciones del premio.
 * @param ProductClass - La clase del producto.
 * @param Quantity - La cantidad del premio.
 * @param ImagePath - La ruta de la imagen del premio.
 * @param OperatorPhoneId - (Opcional) El ID del teléfono del operador.
 */
  constructor(
    public AwardId: number,
    public LongName: string,
    public ShortName: string,
    public Description: string,
    public Cost: number,
    public Points: number,
    public Observations: string,
    public ProductClass: number,
    public Quantity: number,
    public ImagePath: string,
    public OperatorPhoneId?: number
  ) { }
}
