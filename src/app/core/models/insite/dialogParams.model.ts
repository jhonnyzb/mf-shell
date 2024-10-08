
export class DialogParams {
  /**
 * Clase que representa los parámetros de un diálogo.
 *
 * @param msg - El mensaje del diálogo.
 * @param page - La página asociada al diálogo (opcional).
 * @param success - Indica si el diálogo fue exitoso (por defecto es verdadero).
 * @param confirmText - El texto del botón de confirmación del diálogo.
 */
  constructor(
    public msg: any,
    public page: any = null,
    public success: boolean = true,
    public confirmText: string
  ) { }
}
