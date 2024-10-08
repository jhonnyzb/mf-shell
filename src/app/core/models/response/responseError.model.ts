
export class ErrorResponseModel {
  /**
 * Modelo de respuesta para errores.
 *
 * @param {string} PropertyName - El nombre de la propiedad relacionada con el error.
 * @param {string} ErrorMessage - El mensaje de error.
 * @param {any} AttemptedValue - El valor intentado que causó el error.
 * @param {any} CustomState - El estado personalizado relacionado con el error.
 * @param {number} Severity - La gravedad del error.
 * @param {any} ErrorCode - El código de error.
 * @param {any} FormattedMessagePlaceholderValues - Los valores de marcador de posición para el mensaje formateado.
 */
  constructor(
    public PropertyName: string,
    public ErrorMessage: string,
    public AttemptedValue: any,
    public CustomState: any,
    public Severity: number,
    public ErrorCode: any,
    public FormattedMessagePlaceholderValues: any
  ) { }
}
