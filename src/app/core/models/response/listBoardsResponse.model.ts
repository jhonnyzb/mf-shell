import { SegmentModel } from "./segments.model";



export class ListBoardsResponseModel {
  /**
 * Clase que representa el modelo de respuesta para listar tableros.
 *
 * @param boardEntities - Las entidades de tablero.
 */
  constructor(public boardEntities: BoardEntityModel[]) { }
}


export class BoardEntityModel {
  /**
 * Modelo de entidad para la respuesta de la lista de tableros.
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
 * @param segments - Los segmentos del tablero.
 */
  constructor(
    public boardId: number,
    public boardTypeId: number,
    public languageId: number,
    public programId: number,
    public name: string,
    public startDateValidity: string,
    public endDateValidity: string,
    public openingModeId: number,
    public url: string,
    public image: string,
    public displayOrder: number,
    public properties: string,
    public dateRegister: string,
    public dateUpdate: string,
    public personIdCreate: number,
    public personIdUpdate: number,
    public segments: SegmentModel[]) { }
}
