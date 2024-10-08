/**
 * Interfaz que representa la estructura de una respuesta base.
 * @template T - Tipo de dato para la propiedad 'data'.
 * @param codeId - El código de identificación de la respuesta.
 * @param message - El mensaje de la respuesta.
 * @param data - Los datos de la respuesta.
 */
export interface ResponseBaseDto<T> {
  codeId: number
  message: string
  data: T
}
