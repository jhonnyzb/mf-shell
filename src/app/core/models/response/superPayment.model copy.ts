
export class SuperPaymentReferenceModelResponse {
  /**
 * Modelo de referencia de pago super.
 *
 * @param CompanyOrProductName - Nombre de la empresa o producto.
 * @param PaymentReference - Referencia de pago.
 * @param Cost - Costo del pago.
 * @param Points - Puntos del pago.
 * @param ShortName - Nombre corto.
 */
  constructor(
    public CompanyOrProductName: string,
    public PaymentReference: string,
    public Cost: number,
    public Points: number,
    public ShortName: string,
  ) { }
}


export class PaymentModelResponse {
  /**
* Clase que representa la respuesta de un modelo de pago.
*
* @param {string} ShortName - El nombre corto del pago.
* @param {number} OrderId - El ID del pedido.
* @param {number} TransactionId - El ID de la transacción.
* @param {number} PaidValue - El valor pagado.
* @param {number} PointsRedeemed - Los puntos canjeados.
* @param {number} PointsBalance - El saldo de puntos.
* @param {string} [Reference] - La referencia del pago (opcional).
*/
  constructor(
    public ShortName: string,
    public OrderId: number,
    public TransactionId: number,
    public PaidValue: number,
    public PointsRedeemed: number,
    public PointsBalance: number,
    public Reference?: string,
  ) { }
}
