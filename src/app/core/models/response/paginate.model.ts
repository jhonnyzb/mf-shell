
export class PaginationModel {
  /**
 * Clase que representa un modelo de paginación.
 *
 * @param PageSize - El tamaño de la página.
 * @param PageNumber - El número de la página.
 * @param TotalElements - El número total de elementos.
 * @param TotalPages - El número total de páginas.
 */
  constructor(
    public PageSize: number,
    public PageNumber: number,
    public TotalElements: number,
    public TotalPages: number,
  ) { }
}
