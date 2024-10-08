import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FilterProductsModel } from 'src/app/core/models/request/filterProducts.model';
import { ProductsModel } from 'src/app/core/models/response/products.model';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { ProductDetailByIdModel } from 'src/app/core/models/response/productDetail.model';
import { ErrorResponseModel } from 'src/app/core/models/response/responseError.model';
import { ProductByIdResponseDto } from '../dto/response/productsById.dto';
import { ProductsDto } from '../dto/response/products.dto';
import { ProductService } from './products.services';
import { environment } from 'src/environments/environment';

describe('ProductService', () => {
    let service: ProductService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProductService]
        });

        service = TestBed.inject(ProductService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should fetch products correctly', () => {
        const mockFilter: FilterProductsModel = {
            Mode: 1,
            CatalogueIds: [101, 102, 103],
            ProductName: 'tostadora',
            CategoryIds: [201, 202],
            PointsOrderType: 2,
            MinimumPoints: 100,
            MaximumPoints: 500,
            Page: 1,
            PageSize: 10
        };
        const mockResponse: ResponseBaseModel<ProductsDto> = {
            codeId: 800,
            message: 'Datos enviados correctamente',
            data: {
                awards: {
                    data: [
                        {
                            awardId: 1,
                            name: 'Product 1',
                            points: 150,
                            imageName: 'product1.jpg',
                            imagePath: 'https://example.com/images/product1.jpg'
                        },
                        {
                            awardId: 2,
                            name: 'Product 2',
                            points: 250,
                            imageName: 'product2.jpg',
                            imagePath: 'https://example.com/images/product2.jpg'
                        },
                        {
                            awardId: 3,
                            name: 'Product 3',
                            points: 350,
                            imageName: 'product3.jpg',
                            imagePath: 'https://example.com/images/product3.jpg'
                        }
                    ],
                    pagination: null
                }
            }
        };

        service.getProducts(mockFilter).subscribe(response => {
            expect(response.codeId).toEqual(mockResponse.codeId);
            expect(response.message).toEqual(mockResponse.message);
            expect(response.data.Products.Data.length).toBe(3);
            expect(response.data.Products.Data[0].ProductId).toBe(1);
        });

        const req = httpMock.expectOne(`${environment.apiValepro}/award-catalogs-api/api/v1/Awards/get-awards-paginated-by-filter`);
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse);
    });

    it('should handle error when fetching products', () => {
        const mockFilter: FilterProductsModel = {
            Mode: 1,
            CatalogueIds: [101, 102, 103],
            ProductName: 'tostadora',
            CategoryIds: [201, 202],
            PointsOrderType: 2,
            MinimumPoints: 100,
            MaximumPoints: 500,
            Page: 1,
            PageSize: 10
        };
        const mockError = { codeId: 500, Message: 'Error', Data: [] };

        service.getProducts(mockFilter).subscribe({
            error: error => {
                expect(error.codeId).toEqual(mockError.codeId);
                expect(error.message).toEqual(mockError.Message);
            }
        });

        const req = httpMock.expectOne(`${environment.apiValepro}/award-catalogs-api/api/v1/Awards/get-awards-paginated-by-filter`);
        expect(req.request.method).toBe('POST');
        req.flush(mockError, { status: 500, statusText: 'Server Error' });
    });

    it('should fetch product by id correctly', () => {
        const productId = 1;
        const mockResponse: ResponseBaseModel<ProductByIdResponseDto> = {
            codeId: 200,
            message: 'Success',
            data: {
                award: {
                    awardId: 123,
                    awardIdERP: 456,
                    code: 'PROD123',
                    type: 'Electrónica',
                    secondaryCode: 'PROD123-ALT',
                    supplierReference: 'PROV-789',
                    status: true,
                    shortName: 'Teléfono Inteligente',
                    longName: 'Teléfono Inteligente XYZ 128GB',
                    description: 'Un teléfono inteligente de alta calidad con 128GB de almacenamiento.',
                    brandId: 'MARCA123',
                    brandName: 'MarcaXYZ',
                    costCenterId: 'CC-001',
                    weight: 0.5,
                    categoryName: 'Teléfonos Móviles',
                    categoryId: 10,
                    color: 'Negro',
                    programId: 2,
                    cost: 300,
                    points: 1500,
                    combo: false,
                    observations: 'Incluye un año de garantía.',
                    warrantyNotes: 'La garantía cubre solo defectos de fabricación.',
                    productCharacteristics: [
                        {
                            id: 1,
                            name: 'Almacenamiento',
                            value: '128GB'
                        },
                        {
                            id: 2,
                            name: 'RAM',
                            value: '8GB'
                        },
                        {
                            id: 3,
                            name: 'Duración de la Batería',
                            value: '24 horas'
                        }
                    ],
                    profitabilityPercentage: 20,
                    energizerCatalogue: false,
                    feature: true,
                    productClass: 1,
                    category: {
                        categoryId: 10,
                        name: 'Teléfonos Móviles',
                        iconName: 'smartphone',
                        programId: 2,
                    },
                    awardImages: [
                        {
                            awardImageId: 1,
                            awardId: 123,
                            imageName: 'vista-frontal.jpg',
                            imagePath: 'https://example.com/images/vista-frontal.jpg'
                        },
                        {
                            awardImageId: 2,
                            awardId: 123,
                            imageName: 'vista-trasera.jpg',
                            imagePath: 'https://example.com/images/vista-trasera.jpg'
                        }
                    ],
                    productClassAuxiliaryMessage: 'Producto mejor valorado en su clase',
                }
            }
        };

        service.getProductId(productId).subscribe(response => {
            expect(response.codeId).toEqual(mockResponse.codeId);
            expect(response.message).toEqual(mockResponse.message);
            const product = response.data.Award;
            expect(product.AwardId).toEqual(123);
            expect(product.AwardIdERP).toEqual(456);
            expect(product.Code).toEqual('PROD123');
            expect(product.Type).toEqual('Electrónica');
            expect(product.ShortName).toEqual('Teléfono Inteligente');
            expect(product.LongName).toEqual('Teléfono Inteligente XYZ 128GB');
            expect(product.Description).toEqual('Un teléfono inteligente de alta calidad con 128GB de almacenamiento.');
            expect(product.BrandId).toEqual('MARCA123');
            expect(product.BrandName).toEqual('MarcaXYZ');
            expect(product.Cost).toEqual(300);
            expect(product.Points).toEqual(1500);
        });

        const req = httpMock.expectOne(`${environment.apiValepro}/award-catalogs-api/api/v1/Awards/get-award-by-id?AwardId=${productId}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('should handle error when fetching product by id', () => {
        const productId = 1;
        const mockError = { codeId: 500, Message: 'Error', Data: [] };

        service.getProductId(productId).subscribe({
            error: error => {
                expect(error.codeId).toEqual(mockError.codeId);
                expect(error.message).toEqual(mockError.Message);
            }
        });

        const req = httpMock.expectOne(`${environment.apiValepro}/award-catalogs-api/api/v1/Awards/get-award-by-id?AwardId=${productId}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockError, { status: 500, statusText: 'Server Error' });
    });
});
