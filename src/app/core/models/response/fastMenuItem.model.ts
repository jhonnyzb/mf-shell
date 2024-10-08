
export class FastMenuItemModel {
  /**
 * Modelo para representar un elemento de menú rápido.
 *
 * @param MenuItemId - El ID del elemento de menú.
 * @param MenuSettingsByProgramId - El ID de la configuración del menú por ID de programa.
 * @param Name - El nombre del elemento de menú.
 * @param Path - La ruta del elemento de menú.
 * @param Order - El orden del elemento de menú.
 * @param Active - Indica si el elemento de menú está activo o no.
 */
  constructor(
    public MenuItemId: number,
    public MenuSettingsByProgramId: number,
    public Name: string,
    public Path: string,
    public Order: number,
    public Active: boolean
  ) { }
}
