/**
 * Interfaz que representa la respuesta de un valor de pago mixto.
 * @param AmmountToPay - La cantidad a pagar.
 * @param Points - Los puntos asociados al pago.
 */
export interface MixedPaymentValueResponseDto {
  AmmountToPay: number;
  Points: number;
}
