
export class FilterProductsModel {
  /**
 * Modelo para filtrar productos.
 *
 * @param Mode - El modo de filtrado.
 * @param CatalogueIds - Los identificadores de los catálogos.
 * @param ProductName - El nombre del producto.
 * @param CategoryIds - Los identificadores de las categorías.
 * @param PointsOrderType - El tipo de orden de puntos.
 * @param MinimumPoints - El mínimo de puntos.
 * @param MaximumPoints - El máximo de puntos.
 * @param Page - El número de página.
 * @param PageSize - El tamaño de página.
 */
  constructor(
    public Mode: number,
    public CatalogueIds: number[],
    public ProductName: string | null,
    public CategoryIds: number[],
    public PointsOrderType: number | null,
    public MinimumPoints: number | null,
    public MaximumPoints: number | null,
    public Page: number,
    public PageSize: number,
  ) { }
}
