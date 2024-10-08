import { FastMenuItemModel } from "./fastMenuItem.model";



export class FastMenuListResponseModel {
  /**
 * Modelo de respuesta para la lista de menús rápidos.
 *
 * @param {GetQuickMenuModel} GetQuickMenu - El menú rápido obtenido.
 */
  constructor(
    public GetQuickMenu: GetQuickMenuModel
  ) { }
}


export class GetQuickMenuModel {
  /**
 * Modelo para obtener el menú rápido.
 *
 * @param MenuSettingsByProgramId - El ID de la configuración del menú por ID de programa.
 * @param ProgramId - El ID del programa.
 * @param MenuTypeId - El ID del tipo de menú.
 * @param MenuItems - Los elementos del menú rápido.
 */
  constructor(
    public MenuSettingsByProgramId: number,
    public ProgramId: number,
    public MenuTypeId: number,
    public MenuItems: FastMenuItemModel[]
  ) { }
}
