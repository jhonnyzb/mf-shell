import { SegmentDto } from "./semgents.dto"

/**
 * Interfaz que representa la respuesta de la lista de tableros.
 * @param boardEntities - Lista de entidades de tablero.
 */
export interface ListBoardsResponseDto {
  boardEntities: BoardEntityDto[]
}

/**
 * Interfaz que representa los datos de una entidad de tablero.
 *
 * @param boardId - El ID del tablero.
 * @param boardTypeId - El ID del tipo de tablero.
 * @param languageId - El ID del idioma.
 * @param programId - El ID del programa.
 * @param name - El nombre del tablero.
 * @param startDateValidity - La fecha de inicio de validez del tablero.
 * @param endDateValidity - La fecha de finalización de validez del tablero.
 * @param openingModeId - El ID del modo de apertura.
 * @param url - La URL del tablero.
 * @param image - La imagen del tablero.
 * @param displayOrder - El orden de visualización del tablero.
 * @param properties - Las propiedades del tablero.
 * @param dateRegister - La fecha de registro del tablero.
 * @param dateUpdate - La fecha de actualización del tablero.
 * @param personIdCreate - El ID de la persona que creó el tablero.
 * @param personIdUpdate - El ID de la persona que actualizó el tablero.
 * @param segments - Los segmentos asociados al tablero.
 */
export interface BoardEntityDto {
  boardId: number
  boardTypeId: number
  languageId: number
  programId: number
  name: string
  startDateValidity: string
  endDateValidity: string
  openingModeId: number
  url: string
  image: string
  displayOrder: number
  properties: string
  dateRegister: string
  dateUpdate: string
  personIdCreate: number
  personIdUpdate: number,
  segments: SegmentDto[];
}
