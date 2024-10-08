
export class ListBoardsRequestModel {
  /**
 * Modelo de solicitud para listar tableros.
 *
 * @param boardTypeId - El ID del tipo de tablero.
 * @param programId - El ID del programa.
 */
  constructor(
    public boardTypeId: number,
    public programId: number,
    public isWebResponsive: boolean,
  ) { }
}
