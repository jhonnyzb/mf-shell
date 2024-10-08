import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';
import * as CryptoJS from "crypto-js";
import { ListBoardsResponseModel } from 'src/app/core/models/response/listBoardsResponse.model';
const ENCRIPTKEY = "V4l3pr0US3r"

class MockGtmDispatchEventsRepository extends GtmDispatchEventsRepository {
  sendEvent() { }
}


describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let gtmDispatchEventsRepository: GtmDispatchEventsRepository;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BannerComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: GtmDispatchEventsRepository, useClass: MockGtmDispatchEventsRepository },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    gtmDispatchEventsRepository = TestBed.inject(GtmDispatchEventsRepository);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load sections based on the session data', () => {
    spyOn(window.sessionStorage, 'getItem').and.callFake((key) => {
      if (key === 'sections') {
        const mockSections: ListBoardsResponseModel = {
          boardEntities: [
            {
              boardId: 1,
              boardTypeId: 4,
              languageId: 1,
              programId: 1,
              name: 'Section 1',
              startDateValidity: '2024-01-01T00:00:00Z',
              endDateValidity: '2024-12-31T23:59:59Z',
              openingModeId: 1,
              url: 'https://example.com/section1',
              image: 'https://example.com/image1.jpg',
              displayOrder: 1,
              properties: '{}',
              dateRegister: '2024-01-01T00:00:00Z',
              dateUpdate: '2024-06-01T00:00:00Z',
              personIdCreate: 1,
              personIdUpdate: 2,
              segments: [
                { clusterId: 1, name: 'Segment 1' },
                { clusterId: 2, name: 'Segment 2' }
              ]
            },
            {
              boardId: 2,
              boardTypeId: 5,
              languageId: 1,
              programId: 1,
              name: 'Section 2',
              startDateValidity: '2024-01-01T00:00:00Z',
              endDateValidity: '2024-12-31T23:59:59Z',
              openingModeId: 1,
              url: 'https://example.com/section2',
              image: 'https://example.com/image2.jpg',
              displayOrder: 2,
              properties: '{}',
              dateRegister: '2024-01-01T00:00:00Z',
              dateUpdate: '2024-06-01T00:00:00Z',
              personIdCreate: 1,
              personIdUpdate: 2,
              segments: [
                { clusterId: 3, name: 'Segment 3' },
                { clusterId: 4, name: 'Segment 4' }
              ]
            },
          ]
        };

        return CryptoJS.AES.encrypt(JSON.stringify(mockSections), ENCRIPTKEY + key).toString();
      }
      return null;
    });

    component.loadSection();

    expect(component.sections.length).toBe(1);
    expect(component.sections[0].name).toBe('Section 1');
  });

  it('should send GTM data correctly', () => {
    const mockBanner = {
      boardId: 1,
      boardTypeId: 4,
      languageId: 1,
      programId: 1,
      name: 'Section 1',
      startDateValidity: '2024-01-01T00:00:00Z',
      endDateValidity: '2024-12-31T23:59:59Z',
      openingModeId: 1,
      url: 'https://example.com/section1',
      image: 'https://example.com/image1.jpg',
      displayOrder: 1,
      properties: '{}',
      dateRegister: '2024-01-01T00:00:00Z',
      dateUpdate: '2024-06-01T00:00:00Z',
      personIdCreate: 1,
      personIdUpdate: 2,
      segments: [
        { clusterId: 1, name: 'Segment 1' },
        { clusterId: 2, name: 'Segment 2' }
      ]

    };
    component.user = {
      UserId: '12345',
      UserName: 'jhonny',
      AccessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      Name: 'John',
      LastName: 'Zabala',
      FullName: 'John Jairo zabala',
      Email: 'john.zabala@example.com',
      Phone: '3025894588',
      HiddenEmail: 'jo**.do*@example.com',
      HiddenPhone: '305******89',
      PersonId: 98765,
      SessionId: 'session123456789',
      ProgramId: 101,
      AccountId: 202,
      ProgramName: 'Program XYZ',
      LanguageId: 1,
      RequiredNewPassword: false,
      Roles: [
        {
          RoleId: 1,
          RoleName: 'Admin'
        },
        {
          RoleId: 2,
          RoleName: 'afiliado'
        }
      ],
      AcceptHabeasData: true,
      AcceptTermsAndConditions: true
    };

    spyOn(gtmDispatchEventsRepository, 'sendEvent');

    component.sendGtmData(mockBanner);

    expect(gtmDispatchEventsRepository.sendEvent).toHaveBeenCalledWith({
      event: "select_content",
      ParameterTarget: "Home",
      ParameterType: "Imagen Carrusel",
      ParameterCategory: "Banners",
      IDAccount: 202,
      IDProgram: 101,
      IDPerson: 98765,
      UserName: 'jhonny',
      ParameterText: 'Section 1',
      ParameterItemID: '1'
    });
  });

  it('should set isSlideMoving to true on beforeChange', () => {
    component.beforeChange();
    expect(component.isSlideMoving).toBeTrue();
  });
  
  it('should set isSlideMoving to false on afterChange', () => {
    component.afterChange();
    expect(component.isSlideMoving).toBeFalse();
  });

});
