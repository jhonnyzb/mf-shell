
export class CategoryModel {
  /**
 * Modelo de categoría.
 *
 * @param CategoryId - El ID de la categoría.
 * @param Name - El nombre de la categoría.
 * @param IconName - El nombre del ícono de la categoría.
 * @param ProgramId - El ID del programa asociado a la categoría.
 * @param Checked - (Opcional) Indica si la categoría está marcada.
 */
  constructor(
    public CategoryId: number,
    public Name: string,
    public IconName: string,
    public ProgramId: number,
    public Checked?: boolean
  ) { }
}
