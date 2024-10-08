/**
 * Interfaz para representar una solicitud de lista de tableros.
 * @param ProgramId - El ID del programa.
 * @param BoardTypeId - El ID del tipo de tablero.
 */
export interface ListBoardsRequestDto {
  ProgramId: number
  BoardTypeId: number
  IsWebResponsive: boolean
}
