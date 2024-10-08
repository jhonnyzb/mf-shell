import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarComponent } from './topbar.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoryRepository } from 'src/app/core/repositories/category.repository';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { Observable, of, Subject } from 'rxjs';
import { CategoryModel } from 'src/app/core/models/response/categories.model';
import { ProductRepository } from 'src/app/core/repositories/products.repository';
import { FilterProductsModel } from 'src/app/core/models/request/filterProducts.model';
import { ProductsModel } from 'src/app/core/models/response/products.model';
import { ProductDetailByIdModel } from 'src/app/core/models/response/productDetail.model';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';
import { InactivityRepository } from 'src/app/core/repositories/inactivity.repository';
import { MatIcon } from '@angular/material/icon';
import { DialogService } from 'src/app/core/utils/dialog.service';

class MockCategoryRepository extends CategoryRepository {
  getCategories(): Observable<ResponseBaseModel<CategoryModel[]>> {
    const mockResponse: ResponseBaseModel<CategoryModel[]> = {
      codeId: 200,
      message: '',
      data:[]
    };
    return of(mockResponse);
  }
}

class MockProductRepository extends ProductRepository {
  getProducts(data: FilterProductsModel): Observable<ResponseBaseModel<null>>{
    const mockResponse: ResponseBaseModel<null> = {
      codeId: 200,
      message: '',
      data: null
    };
    return of(mockResponse)
  }

  getProductId(productId: number): Observable<ResponseBaseModel<null>> {
    const mockResponse: ResponseBaseModel<null> = {
      codeId: 200,
      message: '',
      data: null
    };
    return of(mockResponse)
  }
}

class MockGtmDispatchEventsRepository extends GtmDispatchEventsRepository {
  sendEvent(){}
}


describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;
  let productRepository: ProductRepository;
  let gtmDispatchEventsRepository: GtmDispatchEventsRepository;
  let inactivityRepositorySpy: jasmine.SpyObj<InactivityRepository>;
  let resetTimerSubject: Subject<any>;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>;
  let categoryRepositorySpy: jasmine.SpyObj<CategoryRepository>;

  beforeEach(async () => {

    resetTimerSubject = new Subject<any>();
    
    inactivityRepositorySpy = jasmine.createSpyObj('InactivityRepository', ['resetTimer']);
    inactivityRepositorySpy.resetTimer.and.returnValue(resetTimerSubject.asObservable());
    dialogServiceSpy = jasmine.createSpyObj('DialogService', ['openCloseSessionDialog']);
    const categoryRepoSpy = jasmine.createSpyObj('CategoryRepository', ['getCategories']);
    
    await TestBed.configureTestingModule({
      declarations: [ TopbarComponent, MatIcon],
      imports:[MatDialogModule, HttpClientTestingModule],
      providers: [MatDialog,
        { provide: CategoryRepository, useValue: categoryRepoSpy },
        { provide: ProductRepository, useClass: MockProductRepository },
        { provide: GtmDispatchEventsRepository, useClass: MockGtmDispatchEventsRepository },
        { provide: InactivityRepository, useValue: inactivityRepositorySpy },
        { provide: DialogService, useValue: dialogServiceSpy },
      ] 
    })
    .compileComponents();
    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    categoryRepositorySpy = TestBed.inject(CategoryRepository) as jasmine.SpyObj<CategoryRepository>;
    productRepository = TestBed.inject(ProductRepository);
    gtmDispatchEventsRepository = TestBed.inject(GtmDispatchEventsRepository);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch "closePopUp" event, set isLogout to true, open dialog and call logout on success', () => {
    spyOn(document, 'dispatchEvent');
    spyOn(component, 'logout');

    component.getInactivityUser();
    
    // Emitir un valor simulado desde resetTimer
    resetTimerSubject.next({});

    expect(document.dispatchEvent).toHaveBeenCalledWith(new CustomEvent('closePopUp'));
    expect(component.isLogout).toBeTrue();
    expect(dialogServiceSpy.openCloseSessionDialog).toHaveBeenCalledWith({
      success: false,
      confirmText: "Ok",
      msg: "Tu sesión ha expirado por inactividad. Por favor, vuelve a iniciar sesión.",
      page: undefined
    });
    expect(component.logout).toHaveBeenCalled();
  });

  it('should fetch categories and insert "Todos" at the beginning', () => {
    const mockCategories: CategoryModel[] = [
      { CategoryId: 1, Name: 'Category 1', IconName: 'icon1', ProgramId: 123 },
      { CategoryId: 2, Name: 'Category 2', IconName: 'icon2', ProgramId: 123 },
    ];
    const mockResponse: ResponseBaseModel<CategoryModel[]> = {
      data: mockCategories,
      codeId: 200,
      message: 'Datos obtenidos correctamente'
    };

    categoryRepositorySpy.getCategories.and.returnValue(of(mockResponse));

    component.getCategories();

    expect(component.categories.length).toBe(3);
    expect(component.categories[0].CategoryId).toBe(0);
    expect(component.categories[0].Name).toBe('Todos');
    expect(categoryRepositorySpy.getCategories).toHaveBeenCalled();
  });

  it('should set textPoints and greet correctly in getForm()', () => {
    const mockResponse = {
      Propiedades: [
        { VariableValefiel: 'lblPuntos', Label: 'Tus puntos' },
        { VariableValefiel: 'lblSaludo', Label: '¡Hola!' }
      ]
    };

    spyOn(window.sessionStorage, 'getItem').and.returnValue(JSON.stringify(mockResponse));

    component.getForm();

    expect(component.textPoints).toBe('Tus puntos');
    expect(component.greet).toBe('¡Hola!');
  });

  it('should return correct value based on type in getgreetAndTextPoints()', () => {
    const mockProperties = [
      { VariableValefiel: 'lblPuntos', Label: '1000 puntos' },
      { VariableValefiel: 'lblSaludo', Label: '¡Hola, usuario!' }
    ];

    const resultPoints = component.getgreetAndTextPoints(mockProperties, 'puntos');
    const resultGreet = component.getgreetAndTextPoints(mockProperties, 'saludo');

    expect(resultPoints).toBe('1000 puntos');
    expect(resultGreet).toBe('¡Hola, usuario!');
  });

  it('should return undefined if no matching type is found in getgreetAndTextPoints()', () => {
    const mockProperties = [
      { VariableValefiel: 'lblPuntos', Label: '1000 puntos' },
      { VariableValefiel: 'lblSaludo', Label: '¡Hola, usuario!' }
    ];

    const result = component.getgreetAndTextPoints(mockProperties, 'nonexistentType');

    expect(result).toBeUndefined();
  });
  
});
