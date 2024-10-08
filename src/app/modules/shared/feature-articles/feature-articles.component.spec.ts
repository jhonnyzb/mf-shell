import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureArticlesComponent } from './feature-articles.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';
import { Observable, of, throwError } from 'rxjs';
import { CatalogRepository } from 'src/app/core/repositories/catalog.repository';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { FeatureProductsModelResponse } from 'src/app/core/models/response/featureProducts.model';
import { ProductDetailByIdModel, ProductDetailModel } from 'src/app/core/models/response/productDetail.model';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/core/utils/dialog.service';
import * as CryptoJS from 'crypto-js';

class MockGtmDispatchEventsRepository extends GtmDispatchEventsRepository {
  sendEvent() { }
}

class MockCatalogRepository extends CatalogRepository {

  getFeatureProducts(): Observable<ResponseBaseModel<FeatureProductsModelResponse[]>> {
    const mockResponse: ResponseBaseModel<FeatureProductsModelResponse[]> = {
      codeId: 200,
      message: 'Se encontró la informacion',
      data: [
        {
          AwardId: 1,
          Name: 'tostadora',
          Points: 200,
          ImageName: 'tostadora.png',
          ImageUrl: 'https://imageurl.com.co'
        }
      ]
    };
    return of(mockResponse);
  }

  getProductId(productId: number): Observable<ResponseBaseModel<ProductDetailByIdModel>> {
    const mockResponse: ResponseBaseModel<ProductDetailByIdModel> = {
      codeId: 200,
      message: 'Se encontró el',
      data: {
        Award: {
          AwardId: 1,
          AwardIdERP: 101,
          Code: "AWD001",
          Type: "Electronicos",
          SecondaryCode: "ELEC001",
          SupplierReference: "SUP12345",
          Status: true,
          ShortName: "Smartphone",
          LongName: "La última generación de smartphones con funciones avanzadas.",
          Description: "Un smartphone con la última tecnología, todo en un diseño elegante.",
          BrandId: "BR123",
          BrandName: "BrandName",
          CostCenterId: "CC001",
          Weight: 150,
          CategoryName: "Celulares",
          CategoryId: 10,
          Color: "Black",
          ProgramId: 1,
          Points: 1000,
          Cost: 299.99,
          Combo: false,
          Observations: "Producto mas popular",
          WarrantyNotes: "2 años de garantia",
          ProductCharacteristics: [
            { Id: 1, Name: "pantalla tactil", Value: "6.5 pulgadas" },
            { Id: 2, Name: "Larga vida bateria", Value: "24 horas" }
          ],
          ProfitabilityPercentage: 10,
          EnergizerCatalogue: false,
          Feature: true,
          ProductClass: 1,
          Category: {
            CategoryId: 10,
            Name: "Celulares",
            IconName: '',
            ProgramId: 1,
            Checked: false
          },
          AwardImages: [
            { AwardImageId: 1, AwardId: 1, ImageName: "foto1.jpg", ImagePath: "/images/foto1.jpg" },
            { AwardImageId: 2, AwardId: 1, ImageName: "foto2.jpg", ImagePath: "/images/foto2.jpg" }
          ],
          ProductClassAuxiliaryMessage: "Su recarga se realizara al numero 3052982360"
        }
      }
    };
    return of(mockResponse);
  }

}

const dialogRefSpy = jasmine.createSpyObj<MatDialogRef<any>>('MatDialogRef', ['afterClosed']);
dialogRefSpy.afterClosed.and.returnValue(of({ flag: true, phoneId: '12345' }));
class MockDialogService {
  openConfirmDialogProduct(message: string, params: any) {
    return dialogRefSpy;
  }
}


describe('FeatureArticlesComponent', () => {
  let component: FeatureArticlesComponent;
  let fixture: ComponentFixture<FeatureArticlesComponent>;
  let gtmDispatchEventsRepository: GtmDispatchEventsRepository;
  let catalogRepository: CatalogRepository;
  let router: Router;
  let dialogService: DialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureArticlesComponent],
      imports: [MatDialogModule],
      providers: [MatDialog,
        { provide: GtmDispatchEventsRepository, useClass: MockGtmDispatchEventsRepository },
        { provide: CatalogRepository, useClass: MockCatalogRepository },
        { provide: DialogService, useClass: MockDialogService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeatureArticlesComponent);
    component = fixture.componentInstance;
    gtmDispatchEventsRepository = TestBed.inject(GtmDispatchEventsRepository);
    catalogRepository = TestBed.inject(CatalogRepository);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load feature products successfully', () => {
    spyOn(catalogRepository, 'getFeatureProducts').and.callThrough();

    component.getFeatureProducts();

    expect(component.slides.length).toBe(1);
    expect(component.slides[0].Name).toBe('tostadora');
  });

  it('should handle error when loading feature products', () => {
    spyOn(catalogRepository, 'getFeatureProducts').and.returnValue(throwError(() => new Error('Error en la transacción')));
    component.getFeatureProducts();
    expect(component.slides.length).toBe(0);
  });

  it('should navigate to product detail and dispatch event on success', () => {

    spyOn(catalogRepository, 'getProductId').and.callThrough();
    spyOn(router, 'navigate');
    spyOn(document, 'dispatchEvent');

    component.goToDetail(1);

    expect(catalogRepository.getProductId).toHaveBeenCalledWith(1);
    expect(router.navigate).toHaveBeenCalledWith(['/main/catalog/detail']);
    expect(document.dispatchEvent).toHaveBeenCalledWith(new CustomEvent('on-change-product', { detail: null }));
  });

  it('should call getProductId and onDialogProduct on success, product class 1', () => {
    spyOn(catalogRepository, 'getProductId').and.callThrough();
    spyOn(component, 'onDialogProduct');

    component.onClikcCart(1);
    expect(catalogRepository.getProductId).toHaveBeenCalledWith(1);

    expect(component.onDialogProduct).toHaveBeenCalledWith({
      AwardId: 1,
      AwardIdERP: 101,
      Code: "AWD001",
      Type: "Electronicos",
      SecondaryCode: "ELEC001",
      SupplierReference: "SUP12345",
      Status: true,
      ShortName: "Smartphone",
      LongName: "La última generación de smartphones con funciones avanzadas.",
      Description: "Un smartphone con la última tecnología, todo en un diseño elegante.",
      BrandId: "BR123",
      BrandName: "BrandName",
      CostCenterId: "CC001",
      Weight: 150,
      CategoryName: "Celulares",
      CategoryId: 10,
      Color: "Black",
      ProgramId: 1,
      Points: 1000,
      Cost: 299.99,
      Combo: false,
      Observations: "Producto mas popular",
      WarrantyNotes: "2 años de garantia",
      ProductCharacteristics: [
        { Id: 1, Name: "pantalla tactil", Value: "6.5 pulgadas" },
        { Id: 2, Name: "Larga vida bateria", Value: "24 horas" }
      ],
      ProfitabilityPercentage: 10,
      EnergizerCatalogue: false,
      Feature: true,
      ProductClass: 1, // Ajusta este valor
      Category: {
        CategoryId: 10,
        Name: "Celulares",
        IconName: '',
        ProgramId: 1,
        Checked: false
      },
      AwardImages: [
        { AwardImageId: 1, AwardId: 1, ImageName: "foto1.jpg", ImagePath: "/images/foto1.jpg" },
        { AwardImageId: 2, AwardId: 1, ImageName: "foto2.jpg", ImagePath: "/images/foto2.jpg" }
      ],
      ProductClassAuxiliaryMessage: "Su recarga se realizara al numero 3052982360"
    });
  });

  it('should call onAddCart when ProductClass is 4', () => {
    spyOn(component, 'onAddCart');

    const product: ProductDetailModel = {
      AwardId: 1,
      AwardIdERP: 101,
      Code: "AWD001",
      Type: "Electronicos",
      SecondaryCode: "ELEC001",
      SupplierReference: "SUP12345",
      Status: true,
      ShortName: "Smartphone",
      LongName: "La última generación de smartphones con funciones avanzadas.",
      Description: "Un smartphone con la última tecnología, todo en un diseño elegante.",
      BrandId: "BR123",
      BrandName: "BrandName",
      CostCenterId: "CC001",
      Weight: 150,
      CategoryName: "Celulares",
      CategoryId: 10,
      Color: "Black",
      ProgramId: 1,
      Points: 1000,
      Cost: 299.99,
      Combo: false,
      Observations: "Producto mas popular",
      WarrantyNotes: "2 años de garantia",
      ProductCharacteristics: [
        { Id: 1, Name: "pantalla tactil", Value: "6.5 pulgadas" },
        { Id: 2, Name: "Larga vida bateria", Value: "24 horas" }
      ],
      ProfitabilityPercentage: 10,
      EnergizerCatalogue: false,
      Feature: true,
      ProductClass: 4, // Ajusta este valor
      Category: {
        CategoryId: 10,
        Name: "Celulares",
        IconName: '',
        ProgramId: 1,
        Checked: false
      },
      AwardImages: [
        { AwardImageId: 1, AwardId: 1, ImageName: "foto1.jpg", ImagePath: "/images/foto1.jpg" },
        { AwardImageId: 2, AwardId: 1, ImageName: "foto2.jpg", ImagePath: "/images/foto2.jpg" }
      ],
      ProductClassAuxiliaryMessage: "Su recarga se realizara al numero 3052982360"
    } as any;

    component.onDialogProduct(product);

    expect(component.onAddCart).toHaveBeenCalledWith(product);
  });

  it('should save session and navigate when ProductClass is 3', () => {
    spyOn(router, 'navigate');

    const product: ProductDetailModel = {
      AwardId: 1,
      AwardIdERP: 101,
      Code: "AWD001",
      Type: "Electronicos",
      SecondaryCode: "ELEC001",
      SupplierReference: "SUP12345",
      Status: true,
      ShortName: "Smartphone",
      LongName: "La última generación de smartphones con funciones avanzadas.",
      Description: "Un smartphone con la última tecnología, todo en un diseño elegante.",
      BrandId: "BR123",
      BrandName: "BrandName",
      CostCenterId: "CC001",
      Weight: 150,
      CategoryName: "Celulares",
      CategoryId: 10,
      Color: "Black",
      ProgramId: 1,
      Points: 1000,
      Cost: 299.99,
      Combo: false,
      Observations: "Producto mas popular",
      WarrantyNotes: "2 años de garantia",
      ProductCharacteristics: [
        { Id: 1, Name: "pantalla tactil", Value: "6.5 pulgadas" },
        { Id: 2, Name: "Larga vida bateria", Value: "24 horas" }
      ],
      ProfitabilityPercentage: 10,
      EnergizerCatalogue: false,
      Feature: true,
      ProductClass: 3,  // Ajusta este valor
      Category: {
        CategoryId: 10,
        Name: "Celulares",
        IconName: '',
        ProgramId: 1,
        Checked: false
      },
      AwardImages: [
        { AwardImageId: 1, AwardId: 1, ImageName: "foto1.jpg", ImagePath: "/images/foto1.jpg" },
        { AwardImageId: 2, AwardId: 1, ImageName: "foto2.jpg", ImagePath: "/images/foto2.jpg" }
      ],
      ProductClassAuxiliaryMessage: "Su recarga se realizara al numero 3052982360"
    } as any;

    component.onDialogProduct(product);
    expect(router.navigate).toHaveBeenCalledWith(['/main/catalog/detail']);
  });

  it('should open dialog and call onAddCart when ProductClass is in typesProductsPopups', () => {
    spyOn(component, 'onAddCart');
    const product: ProductDetailModel = {
      AwardId: 1,
      AwardIdERP: 101,
      Code: "AWD001",
      Type: "Electronicos",
      SecondaryCode: "ELEC001",
      SupplierReference: "SUP12345",
      Status: true,
      ShortName: "Smartphone",
      LongName: "La última generación de smartphones con funciones avanzadas.",
      Description: "Un smartphone con la última tecnología, todo en un diseño elegante.",
      BrandId: "BR123",
      BrandName: "BrandName",
      CostCenterId: "CC001",
      Weight: 150,
      CategoryName: "Celulares",
      CategoryId: 10,
      Color: "Black",
      ProgramId: 1,
      Points: 1000,
      Cost: 299.99,
      Combo: false,
      Observations: "Producto mas popular",
      WarrantyNotes: "2 años de garantia",
      ProductCharacteristics: [
        { Id: 1, Name: "pantalla tactil", Value: "6.5 pulgadas" },
        { Id: 2, Name: "Larga vida bateria", Value: "24 horas" }
      ],
      ProfitabilityPercentage: 10,
      EnergizerCatalogue: false,
      Feature: true,
      ProductClass: 6,  // Ajusta este valor para estar en `typesProductsPopups`
      Category: {
        CategoryId: 10,
        Name: "Celulares",
        IconName: '',
        ProgramId: 1,
        Checked: false
      },
      AwardImages: [
        { AwardImageId: 1, AwardId: 1, ImageName: "foto1.jpg", ImagePath: "/images/foto1.jpg" },
        { AwardImageId: 2, AwardId: 1, ImageName: "foto2.jpg", ImagePath: "/images/foto2.jpg" }
      ],
      ProductClassAuxiliaryMessage: "Su recarga se realizara al numero 3052982360"
    } as any;

    component.onDialogProduct(product);

    expect(dialogRefSpy.afterClosed).toHaveBeenCalled();
    expect(component.onAddCart).toHaveBeenCalledWith(product, '12345');
  });

  it('should add a new product to the cart and call onEventCart', () => {
    spyOn(sessionStorage, 'setItem'); 
    spyOn(component, 'onEventCart');
  
    const product: ProductDetailModel = {
      AwardId: 1,
      LongName: "telefono",
      ShortName: "telefono",
      Description: "Un gran telefono.",
      Cost: 1200000,
      Points: 1000,
      Observations: "Producto popular",
      ProductClass: 1,
      AwardImages: [{ ImagePath: '/images/telefono.jpg' }]
    } as any;
  
    component.onAddCart(product);

    const expectedCart = [{
      AwardId: 1,
      LongName: "telefono",
      ShortName: "telefono",
      Description: "Un gran telefono.",
      Cost: 1200000,
      Points: 1000,
      Observations: "Producto popular",
      ProductClass: 1,
      Quantity: 1,
      OperatorPhoneId: null,
      ImagePath: '/images/telefono.jpg'
    }];
  
    expect(sessionStorage.setItem).toHaveBeenCalledWith('wr-c-cart', jasmine.any(String)); 
    expect(component.onEventCart).toHaveBeenCalledWith(1);
  });
  


});
