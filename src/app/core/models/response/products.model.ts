
export class ProductsModel {
  /**
 * Clase que representa el modelo de productos.
 *
 * @param {ProductInfo} Products - La información de los productos.
 */
  constructor(
    public Products: ProductInfo
  ) { }
}


export class ProductInfo {
  /**
 * Clase que representa la información de un producto.
 * @class
 */
  constructor(
    public Data: ProductModel[],
    public Pagination: null,
  ) { }
}



export class ProductModel {
  /**
 * Clase que representa un modelo de producto.
 *
 * @param ProductId - El ID del producto.
 * @param Name - El nombre del producto.
 * @param Points - Los puntos del producto.
 * @param ImageName - El nombre de la imagen del producto.
 * @param ImagePath - La ruta de la imagen del producto.
 */
  constructor(
    public ProductId: number,
    public Name: string,
    public Points: number,
    public ImageName: string,
    public ImagePath: string,
  ) { }
}
