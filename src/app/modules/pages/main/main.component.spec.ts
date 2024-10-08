import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BannerComponent } from '../../shared/banner/banner.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';
import { WidgetsComponent } from '../../shared/widgets/widgets.component';
import { FeatureArticlesComponent } from '../../shared/feature-articles/feature-articles.component';
import { NewsComponent } from '../../shared/news/news.component';
import { BoardRepository } from 'src/app/core/repositories/board.repository';
import { ListBoardsRequestModel } from 'src/app/core/models/request/listBoardRequest.model';
import { Observable, of } from 'rxjs';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { ListBoardsResponseModel } from 'src/app/core/models/response/listBoardsResponse.model';
import { PolicyAcceptanceDialogComponent } from '../../shared/policy-acceptance-dialog/policy-acceptance-dialog.component';
import * as CryptoJS from "crypto-js";
import { PopupInformationComponent } from '../../shared/popup-information/popup-information.component';
const ENCRIPTKEY = "V4l3pr0US3r"
class MockGtmDispatchEventsRepository extends GtmDispatchEventsRepository {
  sendEvent() { }
}

class MockBoardRepository extends BoardRepository {
  listBoards(params: ListBoardsRequestModel): Observable<ResponseBaseModel<ListBoardsResponseModel>> {
    const mockResponse: ResponseBaseModel<ListBoardsResponseModel> = {
      codeId: 200,
      message: 'Se encontró el tablero',
      data: {
        boardEntities: [{
          "boardId": 318,
          "boardTypeId": 2,
          "languageId": 0,
          "programId": 6,
          "name": "pruebas sergio ",
          "startDateValidity": "2024-08-09T05:00:00+00:00",
          "endDateValidity": "2024-08-31T05:00:00+00:00",
          "openingModeId": 1,
          "url": "",
          "image": "https://s3.amazonaws.com/stage.valepro.resources/boards/6/Banner%20principal/banner3_20240809_204937961.png?AWSAccessKeyId=ASIA5EDECB43ZXQDHUXA&Expires=1724412011&x-amz-security-token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDJkstzs6N6RzunngkIsgBJURRvK3JrXm%2F6%2Bg4%2Fl144awIhAJp8zG4nP0dZVrBLxZN9A2BdkddDWAj%2BJWyvXs8l2eK7Ku8CCJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMOTAyMTUyOTgyMzI3IgyOYJyrr7OID2o%2Fk4EqwwIi33MbNio9NU9OMXLaoH8lzq9xfvSjESFVPrauHljvtyxnLgbg%2BPbyY6hHhchQyuECkhZ9OxrycqV4zWIaOrB4U7JXK2wauJNztMzyXMkSNiN7NtJp6Crg1oC%2BCmzuIw%2FgUMg2PN76aHbOtfjnweyOWOzXNNuGME9WfUW66P1%2FZUS0%2FPaCCnSmV6zdATNHI1xYK%2BcNVw5c5AF4wsHGRt5Wk8X1mE6KVsuXDk339QAsmyz06QVm7BilT58r2IJCiWm7bf9DJRcYdCfm%2BIA0sNuZsG6NVufq%2BahD6WSB6XLJzS76HcHpxMZCMGmiiYxWibxjp%2BTYxVU9fZyWBG3bJ%2F0BLKsDz5FrXbxdpP26NxluDZu7ysJvnbd0KvHqDReH5vzsuyniovE%2FKciCXKw93MpjxanYY8H8515Cki09ocflyBz04jDN3562BjqdAeWQOA5mpWI0cUGeze%2BR77m8WsP8EMYLnzhHQYWQ%2BoTIbAO3rGWd8C3N50C7l786oyVD7OhWUbjtnv2D0TZSyXpyqhSodv28k7aW%2FGTeo3jasT9roltgiLC5f2LFl6T3W0zHdNUgl6V0cR6ZpG2PxzwssjQJ90CKusq1LRvvKWj7wShlspw3xw79nJtWTI%2Bapv%2FuegesOz8tBDwUfBU%3D&Signature=SnLZ9KIwiX3iFM7RBc80XOzVNsk%3D",
          "displayOrder": 9,
          "properties": "banner3.png",
          "dateRegister": "2024-08-09T20:49:37.96305+00:00",
          "dateUpdate": "2024-08-09T20:49:37.963051+00:00",
          "personIdCreate": 24,
          "personIdUpdate": 24,
          "segments": [
            {
              "clusterId": 3,
              "name": "Administrador"
            },
            {
              "clusterId": 20,
              "name": "Pru-f1"
            },
            {
              "clusterId": 26,
              "name": "Equipo 1"
            },
          ]
        }]
      }
    };
    return of(mockResponse);
  }
}


describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let gtmDispatchEventsRepository: GtmDispatchEventsRepository;
  let boardRepository: BoardRepository;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent, BannerComponent, WidgetsComponent, FeatureArticlesComponent, NewsComponent],
      imports: [MatDialogModule, HttpClientTestingModule],
      providers: [MatDialog,
        { provide: GtmDispatchEventsRepository, useClass: MockGtmDispatchEventsRepository },
        { provide: BoardRepository, useClass: MockBoardRepository },
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    gtmDispatchEventsRepository = TestBed.inject(GtmDispatchEventsRepository);
    boardRepository = TestBed.inject(BoardRepository);
    dialog = TestBed.inject(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and process boards correctly', () => {
    spyOn(boardRepository, 'listBoards').and.callThrough();;
    spyOn(component, 'openModalInfo');
    spyOn(document, 'dispatchEvent');

    component.getMessageResources();
    expect(boardRepository.listBoards).toHaveBeenCalled();
    expect(component.isLoading).toBeFalse();
    expect(component.listPopups.length).toBeGreaterThan(0);
    expect(document.dispatchEvent).toHaveBeenCalledWith(jasmine.any(CustomEvent));
    expect(component.openModalInfo).toHaveBeenCalled();
  });

  it('should open PolicyAcceptanceDialog if terms are not accepted', () => {
    spyOn(window.sessionStorage, 'getItem').and.callFake((key) => {
      if (key === 'accountValepro') {
        const mockSessionData = {
          AcceptHabeasData: false,
          AcceptTermsAndConditions: false,
        };
        return CryptoJS.AES.encrypt(JSON.stringify(mockSessionData), ENCRIPTKEY + key).toString();
      }
      return null;
    });
    spyOn(dialog, 'open');

    component.openPolicyDialog();

    expect(dialog.open).toHaveBeenCalledWith(PolicyAcceptanceDialogComponent, {
      width: '624px',
      hasBackdrop: true,
      disableClose: true
    });
  });

  it('should not open PolicyAcceptanceDialog if terms are accepted', () => {
    spyOn(window.sessionStorage, 'getItem').and.callFake((key) => {
      if (key === 'accountValepro') {
        const mockSessionData = {
          AcceptHabeasData: true,
          AcceptTermsAndConditions: true,
        };
        return CryptoJS.AES.encrypt(JSON.stringify(mockSessionData), ENCRIPTKEY + key).toString();
      }
      return null;
    });
    spyOn(dialog, 'open');

    component.openPolicyDialog();

    expect(dialog.open).not.toHaveBeenCalled();
  });

  it('should show popup modals correctly', () => {
    component.listPopups = [
      {
        startDateValidity: new Date(Date.now() - 86400000).toString(), // hace que la fecha sea válida
        endDateValidity: new Date(Date.now() + 86400000).toString(),
        boardId: 0,
        boardTypeId: 0,
        languageId: 0,
        programId: 0,
        name: '',
        openingModeId: 0,
        url: '',
        image: '',
        displayOrder: 0,
        properties: '',
        dateRegister: '',
        dateUpdate: '',
        personIdCreate: 0,
        personIdUpdate: 0,
        segments: []
      }
    ];
    spyOn(window.sessionStorage, 'getItem').and.returnValue(null); // Para simular que no hay valor en sesión

    // Crea un mock de MatDialogRef que incluye el método afterClosed.
    const dialogRefSpy = jasmine.createSpyObj<MatDialogRef<any>>('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(true));
    
    spyOn(dialog, 'open').and.returnValue(dialogRefSpy);

    component.openModalInfo();

    expect(dialog.open).toHaveBeenCalledWith(PopupInformationComponent, {
      data: component.listPopups[0],
      disableClose: true
    });
  });

  it('should get user data from session', () => {
    const mockSessionData = {
      UserId: '12345',
      UserName: 'john',
      AccessToken: 'token123',
      Name: 'John',
      LastName: 'diaz',
      FullName: 'John Diaz',
      Email: 'johndiaz@example.com',
      Phone: '30254626598',
      HiddenEmail: '***@example.com',
      HiddenPhone: '******890',
      PersonId: 789,
      SessionId: 'sessionId123',
      ProgramId: 101,
      AccountId: 202,
      ProgramName: 'Sample Program',
      LanguageId: 1,
      RequiredNewPassword: false,
      Roles: [
        {
          RoleId: 1,
          RoleName: 'Admin'
        },
        {
          RoleId: 2,
          RoleName: 'User'
        }
      ],
      AcceptHabeasData: true,
      AcceptTermsAndConditions: true
    };

    spyOn(window.sessionStorage, 'getItem').and.callFake((key) => {
      if (key === 'accountValepro') {
        return CryptoJS.AES.encrypt(JSON.stringify(mockSessionData), ENCRIPTKEY + key).toString();
      }
      return null;
    });
    
    component.getUser();

    expect(component.user).toEqual(mockSessionData);
  });

});
