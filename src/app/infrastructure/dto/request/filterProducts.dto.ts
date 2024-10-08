/**
 * Interfaz que representa los datos de filtrado de productos.
 * @param mode - El modo de filtrado.
 * @param catalogueIds - Los identificadores de los catálogos.
 * @param productName - El nombre del producto.
 * @param categoryIds - Los identificadores de las categorías.
 * @param pointsOrderType - El tipo de orden de los puntos.
 * @param minimumPoints - La cantidad mínima de puntos.
 * @param maximumPoints - La cantidad máxima de puntos.
 * @param page - El número de página.
 * @param pageSize - El tamaño de página.
 */
export interface FilterProductsDto {
  mode: number;
  catalogueIds: number[];
  productName: string | null;
  categoryIds: number[];
  pointsOrderType: number | null;
  minimumPoints: number | null;
  maximumPoints: number | null;
  page: number;
  pageSize: number;
}
