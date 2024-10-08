/**
 * Interfaz que representa un DTO de categoría.
 *
 * @param categoryId - El ID de la categoría.
 * @param name - El nombre de la categoría.
 * @param iconName - El nombre del icono de la categoría.
 * @param programId - El ID del programa asociado a la categoría.
 */
export interface CategoryDto {
  categoryId: number,
  name: string,
  iconName: string,
  programId: number,
}
