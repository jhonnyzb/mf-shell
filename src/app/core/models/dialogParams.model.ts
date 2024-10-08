
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
    public confirmText: string,
  ) { }
}


export class DialogParamsAward {
  /**
 * Clase que representa los parámetros de un diálogo de premios.
 *
 * @param {string | null} Msg - El mensaje del diálogo.
 * @param {string | null} Page - La página del diálogo.
 * @param {number | null} TypeAward - El tipo de premio del diálogo.
 */
  constructor(
    public Msg: string | null,
    public Page: string | null,
    public TypeAward: number | null
  ) { }
}
