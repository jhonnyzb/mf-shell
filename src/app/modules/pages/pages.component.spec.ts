import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesComponent } from './pages.component';
import { TopbarComponent } from '../shared/topbar/topbar.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoryRepository } from 'src/app/core/repositories/category.repository';
import { Observable, of } from 'rxjs';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { CategoryModel } from 'src/app/core/models/response/categories.model';
import { ProductRepository } from 'src/app/core/repositories/products.repository';
import { FilterProductsModel } from 'src/app/core/models/request/filterProducts.model';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';
import { InactivityRepository } from 'src/app/core/repositories/inactivity.repository';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from '../shared/footer/footer.component';
import { MatIcon } from '@angular/material/icon';

class MockCategoryRepository extends CategoryRepository {
  getCategories(): Observable<ResponseBaseModel<CategoryModel[]>> {
    const mockResponse: ResponseBaseModel<CategoryModel[]> = {
      codeId: 200,
      message: '',
      data: []
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

class MockInactivityRepository extends InactivityRepository {
  resetTimer(): Observable<any>{
    return of(null)
  }

}


describe('PagesComponent', () => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;
  let categoryRepository: CategoryRepository;
  let productRepository: ProductRepository;
  let gtmDispatchEventsRepository: GtmDispatchEventsRepository;
  let inactivityRepository: InactivityRepository;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagesComponent, TopbarComponent, FooterComponent, MatIcon],
      imports: [MatDialogModule, HttpClientTestingModule, RouterTestingModule],
      providers: [MatDialog,
        { provide: CategoryRepository, useClass: MockCategoryRepository },
        { provide: ProductRepository, useClass: MockProductRepository },
        { provide: GtmDispatchEventsRepository, useClass: MockGtmDispatchEventsRepository },
        { provide: InactivityRepository, useClass: MockInactivityRepository },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;
    categoryRepository = TestBed.inject(CategoryRepository);
    productRepository = TestBed.inject(ProductRepository);
    gtmDispatchEventsRepository = TestBed.inject(GtmDispatchEventsRepository);
    inactivityRepository = TestBed.inject(InactivityRepository);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle "right-bar-enabled" class on the body element', () => {
    const body = document.body;
    body.classList.remove('right-bar-enabled');
    
    component.onSettingsButtonClicked();
    expect(body.classList.contains('right-bar-enabled')).toBe(true);

    component.onSettingsButtonClicked();
    expect(body.classList.contains('right-bar-enabled')).toBe(false);
  });

  beforeEach(() => {
    document.body.className = '';
  });

  it('should toggle sidebar-enable and vertical-collapsed classes on the body element', () => {
    component.isCondensed = false;

    component.onToggleMobileMenu();
    expect(component.isCondensed).toBe(true);
    expect(document.body.classList.contains('sidebar-enable')).toBe(true);
    expect(document.body.classList.contains('vertical-collpsed')).toBe(true);

    component.onToggleMobileMenu();
    expect(component.isCondensed).toBe(false);
    expect(document.body.classList.contains('sidebar-enable')).toBe(false);
    expect(document.body.classList.contains('vertical-collpsed')).toBe(false);
  });

  it('should remove vertical-collapsed class if screen width is less than or equal to 768', () => {
    spyOnProperty(window.screen, 'width', 'get').and.returnValue(768);

    component.onToggleMobileMenu();
    expect(document.body.classList.contains('vertical-collpsed')).toBe(false);
  });

  it('should add vertical-collapsed class if screen width is greater than 768', () => {
    spyOnProperty(window.screen, 'width', 'get').and.returnValue(1024);

    component.onToggleMobileMenu();
    expect(document.body.classList.contains('vertical-collpsed')).toBe(true);
  });
});
