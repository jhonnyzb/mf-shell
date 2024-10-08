import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { CategoryModel } from 'src/app/core/models/response/categories.model';
import { CategoryDto } from '../dto/response/categories.dto';
import { CategoryService } from './category.services';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch categories correctly', () => {
    const mockResponse: ResponseBaseModel<CategoryDto[]> = {
      codeId: 200,
      message: 'Success',
      data: [
        { categoryId: 1, name: 'Electrónica', iconName: 'electronics-icon', programId: 6 },
        { categoryId: 2, name: 'Libros', iconName: 'books-icon', programId: 6 }
      ]
    };
    service.getCategories().subscribe(response => {
      expect(response.codeId).toEqual(mockResponse.codeId);
      expect(response.message).toEqual(mockResponse.message);
      expect(response.data.length).toBe(2);
      expect(response.data[0].Name).toEqual('Electrónica');
      expect(response.data[1].Name).toEqual('Libros');
    });

    const req = httpMock.expectOne(`${environment.apiValepro}/award-catalogs-api/api/v1/Category/get-categories`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error response correctly', () => {
    const mockErrorResponse = {
      status: 400,
      statusText: 'Bad Request',
      error: {
        codeId: 400,
        message: 'Invalid Request',
        data: null
      }
    };

    service.getCategories().subscribe({
      next: () => fail('should have failed with a 400 error'),
      error: (errorResponse) => {
        expect(errorResponse.codeId).toEqual(400);
        expect(errorResponse.message).toEqual('Invalid Request');
        expect(errorResponse.data).toBeNull();
      }
    });

    const req = httpMock.expectOne(`${environment.apiValepro}${service['baseUrl2']}/Category/get-categories`);
    expect(req.request.method).toBe('GET');
    req.flush(mockErrorResponse.error, { status: 400, statusText: 'Bad Request' });
  });
});
