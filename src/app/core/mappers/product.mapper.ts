
import { ProductDto, ProductInfoDto, ProductsDto } from "src/app/infrastructure/dto/response/products.dto"
import { FilterProductsModel } from "../models/request/filterProducts.model"
import { ProductInfo, ProductModel, ProductsModel } from "../models/response/products.model"
import { FilterProductsDto } from "src/app/infrastructure/dto/request/filterProducts.dto"
import { ProductByIdResponseDto, ProductCharacteristicDto, ProductDetailDto, ProductImageDto } from "src/app/infrastructure/dto/response/productsById.dto"
import { ProductCharacteristicModel, ProductDetailByIdModel, ProductDetailModel, ProductImageModel } from "../models/response/productDetail.model"
import { CategoryDto } from "src/app/infrastructure/dto/response/categories.dto"
import { CategoryModel } from "../models/response/categories.model"
import { FeatureProductsResponseDto } from "src/app/infrastructure/dto/response/featureProducts.dto"
import { FeatureProductsModelResponse } from "../models/response/featureProducts.model"


export class ProductMapper {

  /**
   * Convierte los datos del filtro de productos del dominio al DTO del filtro de productos.
   * @param filterData Los datos del filtro de productos del dominio.
   * @returns El DTO del filtro de productos.
   */
  static fromDomainToApi(filterData: FilterProductsModel): FilterProductsDto {
    return {
      mode: filterData.Mode,
      catalogueIds: filterData.CatalogueIds,
      productName: filterData.ProductName,
      categoryIds: filterData.CategoryIds,
      pointsOrderType: filterData.PointsOrderType,
      minimumPoints: filterData.MinimumPoints,
      maximumPoints: filterData.MaximumPoints,
      page: filterData.Page,
      pageSize: filterData.PageSize
    }
  }

  /**
   * Convierte un objeto de tipo ProductsDto en un objeto de tipo ProductsModel.
   *
   * @param response - El objeto de tipo ProductsDto que se va a convertir.
   * @returns Un objeto de tipo ProductsModel.
   */
  static fromApiToDomain(response: ProductsDto): ProductsModel {
    return {
      Products: this.mapProducts(response.awards)
    }
  }

  /**
   * Mapea los productos de un objeto ProductInfoDto a un objeto ProductInfo.
   *
   * @param products - Objeto ProductInfoDto que contiene los productos a mapear.
   * @returns Objeto ProductInfo que contiene los productos mapeados.
   */
  static mapProducts(products: ProductInfoDto): ProductInfo {
    return {
      Data: products.data.map((dto) => this.mapDataProduct(dto)),
      Pagination: null
    }
  }

  /**
   * Mapea los datos de un objeto ProductDto a un objeto ProductModel.
   *
   * @param dto - El objeto ProductDto a ser mapeado.
   * @returns El objeto ProductModel mapeado.
   */
  static mapDataProduct(dto: ProductDto): ProductModel {
    return {
      ProductId: dto.awardId,
      Name: dto.name,
      Points: dto.points,
      ImageName: dto.imageName,
      ImagePath: dto.imagePath
    }
  }



  /**
   * Mapea un objeto ProductImageDto a un objeto ProductImageModel.
   *
   * @param dto - El objeto ProductImageDto a mapear.
   * @returns El objeto ProductImageModel mapeado.
   */
  static mapResponseProductImage(dto: ProductImageDto): ProductImageModel {
    return new ProductImageModel(
      dto.awardImageId,
      dto.awardId,
      dto.imageName,
      dto.imagePath
    );
  }

  /**
   * Mapea un objeto ProductCharacteristicDto a un objeto ProductCharacteristicModel.
   *
   * @param dto - El objeto ProductCharacteristicDto a mapear.
   * @returns El objeto ProductCharacteristicModel mapeado.
   */
  static mapResponseAwardCharacteristics(dto: ProductCharacteristicDto): ProductCharacteristicModel {
    return new ProductCharacteristicModel(
      dto.id,
      dto.name,
      dto.value
    );
  }

  /**
   * Mapea una categoría de respuesta a un modelo de categoría.
   *
   * @param dto - El objeto DTO de la categoría.
   * @returns El modelo de categoría mapeado.
   */
  static mapResponseCategory(dto: CategoryDto): CategoryModel {
    return new CategoryModel(
      dto.categoryId,
      dto.name,
      dto.iconName,
      dto.programId
    );
  }

  /**
   * Convierte un objeto ProductDetailDto en un objeto ProductDetailModel.
   *
   * @param dto - El objeto ProductDetailDto a convertir.
   * @returns El objeto ProductDetailModel convertido.
   */
  static ProductByIdFromApitoDomain(dto: ProductDetailDto): ProductDetailModel {
    return new ProductDetailModel(
      dto.awardId,
      dto.awardIdERP,
      dto.code,
      dto.type,
      dto.secondaryCode,
      dto.supplierReference,
      dto.status,
      dto.shortName,
      dto.longName,
      dto.description,
      dto.brandId,
      dto.brandName,
      dto.costCenterId,
      dto.weight,
      dto.categoryName,
      dto.categoryId,
      dto.color,
      dto.programId,
      dto.points,
      dto.cost,
      dto.combo,
      dto.observations,
      dto.warrantyNotes,
      dto.productCharacteristics.length > 0 ? dto.productCharacteristics.map((variable) => this.mapResponseAwardCharacteristics(variable)) : [],
      dto.profitabilityPercentage,
      dto.energizerCatalogue,
      dto.feature,
      dto.productClass,
      this.mapResponseCategory(dto.category),
      dto.awardImages.length > 0 ? dto.awardImages.map((variable) => this.mapResponseProductImage(variable)) : [],
      dto.productClassAuxiliaryMessage
    );
  }

  /**
   * Convierte un objeto de respuesta de la API de producto por ID en un modelo de detalle de producto por ID.
   *
   * @param dto - El objeto de respuesta de la API de producto por ID.
   * @returns El modelo de detalle de producto por ID.
   */
  static mapResponseProductByIdApiToDomain(dto: ProductByIdResponseDto): ProductDetailByIdModel {
    return new ProductDetailByIdModel(
      this.ProductByIdFromApitoDomain(dto.award)
    );
  }

  /**
   * Convierte un arreglo de objetos FeatureProductsResponseDto a un arreglo de objetos FeatureProductsModelResponse.
   *
   * @param dto - Arreglo de objetos FeatureProductsResponseDto a ser convertidos.
   * @returns Arreglo de objetos FeatureProductsModelResponse convertidos.
   */
  static fromApiToDomainFeatureProducts(dto: FeatureProductsResponseDto[]): FeatureProductsModelResponse[] {

    const data = dto.map((item: FeatureProductsResponseDto) => {
      return {
        AwardId: item.awardId,
        Name: item.name,
        Points: item.points,
        ImageName: item.imageName,
        ImageUrl: item.imageUrl
      }
    })

    return data;
  }
}
