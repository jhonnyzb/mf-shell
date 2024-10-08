import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NewsComponent } from './news.component';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';
import { BoardEntityModel, ListBoardsResponseModel } from 'src/app/core/models/response/listBoardsResponse.model';
import { saveSession } from 'src/app/core/utils/encryptData';
import { Router } from '@angular/router';

class MockGtmDispatchEventsRepository extends GtmDispatchEventsRepository {
  sendEvent() { }
}

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let gtmDispatchEventsRepository: GtmDispatchEventsRepository;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    await TestBed.configureTestingModule({
      declarations: [NewsComponent],
      providers: [
        { provide: GtmDispatchEventsRepository, useClass: MockGtmDispatchEventsRepository },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    gtmDispatchEventsRepository = TestBed.inject(GtmDispatchEventsRepository);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch sections and call calculateItemWidth', fakeAsync(() => {
    // Datos simulados para getSession
    const mockData: ListBoardsResponseModel = {
      boardEntities: [
        {
          boardId: 1,
          boardTypeId: 3,
          languageId: 1,
          programId: 101,
          name: 'Board 1',
          startDateValidity: '2024-01-01',
          endDateValidity: '2024-12-31',
          openingModeId: 2,
          url: 'https://example.com/board1',
          image: 'https://example.com/image1.jpg',
          displayOrder: 1,
          properties: '{"key": "value"}',
          dateRegister: '2024-01-01T12:00:00Z',
          dateUpdate: '2024-01-02T12:00:00Z',
          personIdCreate: 1001,
          personIdUpdate: 1002,
          segments: []
        },
        {
          boardId: 2,
          boardTypeId: 2,
          languageId: 1,
          programId: 102,
          name: 'Board 2',
          startDateValidity: '2024-01-01',
          endDateValidity: '2024-12-31',
          openingModeId: 3,
          url: 'https://example.com/board2',
          image: 'https://example.com/image2.jpg',
          displayOrder: 2,
          properties: '{"key": "value"}',
          dateRegister: '2024-01-01T12:00:00Z',
          dateUpdate: '2024-01-02T12:00:00Z',
          personIdCreate: 1003,
          personIdUpdate: 1004,
          segments: []
        }
      ]
    };
    saveSession(mockData, 'sections');
    spyOn(component, 'calculateItemWidth').and.callThrough();

    component.ngOnInit();

    tick(100);
    expect(component.sections.length).toBe(1); // Solo debería contener la entidad con boardTypeId === 3
    expect(component.calculateItemWidth).toHaveBeenCalled();
  }));

  it('should not proceed if isSliderMoving is true', () => {
    spyOn(component, 'sendGtmData');
    component.isSliderMoving = true;

    const mockNews: BoardEntityModel = {
      boardId: 1,
      boardTypeId: 3,
      languageId: 1,
      programId: 101,
      name: 'News 1',
      startDateValidity: '2024-01-01',
      endDateValidity: '2024-12-31',
      openingModeId: 2,
      url: 'https://example.com/news1',
      image: 'https://example.com/image1.jpg',
      displayOrder: 1,
      properties: '{"key": "value"}',
      dateRegister: '2024-01-01T12:00:00Z',
      dateUpdate: '2024-01-02T12:00:00Z',
      personIdCreate: 1001,
      personIdUpdate: 1002,
      segments: []
    };

    component.showNews(mockNews);

    expect(component.sendGtmData).not.toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should set itemWidth to screenWidth - 100 when screenWidth is less than or equal to 1000', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(800);
    component.calculateItemWidth();
    expect(component.itemWidth).toBe(700); // 800 - 100 = 700
  });

  it('should set itemWidth to 900 when screenWidth is greater than 1000', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(1200);
    component.calculateItemWidth();
    expect(component.itemWidth).toBe(900);
  });

  it('should set itemWidth to 900 when screenWidth is exactly 1000', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(1000);
    component.calculateItemWidth();
    expect(component.itemWidth).toBe(900);
  });

});
