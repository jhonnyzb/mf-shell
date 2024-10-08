import { CategoryModel } from "./categories.model";


export class ProductDetailByIdModel {
  /**
 * Clase que representa un modelo de detalle de producto por ID.
 *
 * @param Award - El objeto que contiene los detalles del producto.
 */
  constructor(
    public Award: ProductDetailModel,
  ) { }
}


export class ProductDetailModel {
  /**
* Clase que representa el modelo de detalle de producto.
*
* @param AwardId - El ID del premio.
* @param AwardIdERP - El ID del premio en el sistema ERP.
* @param Code - El código del producto.
* @param Type - El tipo de producto.
* @param SecondaryCode - El código secundario del producto.
* @param SupplierReference - La referencia del proveedor.
* @param Status - El estado del producto.
* @param ShortName - El nombre corto del producto.
* @param LongName - El nombre largo del producto.
* @param Description - La descripción del producto.
* @param BrandId - El ID de la marca del producto.
* @param BrandName - El nombre de la marca del producto.
* @param CostCenterId - El ID del centro de costos del producto.
* @param Weight - El peso del producto.
* @param CategoryName - El nombre de la categoría del producto.
* @param CategoryId - El ID de la categoría del producto.
* @param Color - El color del producto.
* @param ProgramId - El ID del programa del producto.
* @param Points - Los puntos del producto.
* @param Cost - El costo del producto.
* @param Combo - Indica si el producto es un combo.
* @param Observations - Las observaciones del producto.
* @param WarrantyNotes - Las notas de garantía del producto.
* @param ProductCharacteristics - Las características del producto.
* @param ProfitabilityPercentage - El porcentaje de rentabilidad del producto.
* @param EnergizerCatalogue - Indica si el producto está en el catálogo de Energizer.
* @param Feature - Indica si el producto es una característica.
* @param ProductClass - La clase del producto.
* @param Category - El modelo de categoría del producto.
* @param AwardImages - Las imágenes del producto.
* @param ProductClassAuxiliaryMessage - El mensaje auxiliar de la clase del producto.
*/
  constructor(
    public AwardId: number,
    public AwardIdERP: number,
    public Code: string,
    public Type: string,
    public SecondaryCode: string,
    public SupplierReference: string,
    public Status: boolean,
    public ShortName: string,
    public LongName: string,
    public Description: string,
    public BrandId: string,
    public BrandName: string,
    public CostCenterId: string,
    public Weight: number,
    public CategoryName: string,
    public CategoryId: number,
    public Color: string,
    public ProgramId: number,
    public Points: number,
    public Cost: number,
    public Combo: boolean,
    public Observations: string,
    public WarrantyNotes: string,
    public ProductCharacteristics: ProductCharacteristicModel[],
    public ProfitabilityPercentage: number,
    public EnergizerCatalogue: boolean,
    public Feature: boolean,
    public ProductClass: number,
    public Category: CategoryModel,
    public AwardImages: ProductImageModel[],
    public ProductClassAuxiliaryMessage: string,
  ) { }
}



export class ProductImageModel {
  /**
* Clase que representa un modelo de imagen de producto.
*
* @param AwardImageId - El ID de la imagen del premio.
* @param AwardId - El ID del premio.
* @param ImageName - El nombre de la imagen.
* @param ImagePath - La ruta de la imagen.
*/
  constructor(
    public AwardImageId: number,
    public AwardId: number,
    public ImageName: string,
    public ImagePath: string,
  ) { }
}



export class ProductCharacteristicModel {
  /**
* Clase que representa un modelo de característica de producto.
*
* @param Id - El identificador de la característica.
* @param Name - El nombre de la característica.
* @param Value - El valor de la característica.
*/
  constructor(
    public Id: number,
    public Name: string,
    public Value: string,

  ) { }
}
