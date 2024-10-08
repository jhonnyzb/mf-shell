import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuProfileComponent } from './menu-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';
import { saveSession } from 'src/app/core/utils/encryptData';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/core/utils/dialog.service';
import { of } from 'rxjs';

class MockGtmDispatchEventsRepository extends GtmDispatchEventsRepository {
  sendEvent() { }
}


describe('MenuProfileComponent', () => {
  let component: MenuProfileComponent;
  let fixture: ComponentFixture<MenuProfileComponent>;
  let gtmDispatchEventsRepository: GtmDispatchEventsRepository;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>;
  let dialogRefSpy: jasmine.SpyObj<any>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(true));

    dialogServiceSpy = jasmine.createSpyObj('DialogService', ['openConfirmDialog']);
    dialogServiceSpy.openConfirmDialog.and.returnValue(dialogRefSpy);

    await TestBed.configureTestingModule({
      declarations: [MenuProfileComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [MatDialog,
        { provide: GtmDispatchEventsRepository, useClass: MockGtmDispatchEventsRepository },
        { provide: Router, useValue: routerSpy },
        { provide: DialogService, useValue: dialogServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MenuProfileComponent);
    component = fixture.componentInstance;
    gtmDispatchEventsRepository = TestBed.inject(GtmDispatchEventsRepository);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load and filter active menu items from sessionStorage', () => {
    const mockMenu = {
      MenuSettingsByProgramId: 123,
      ProgramId: 456,
      MenuTypeId: 789,
      MenuItems: [
        { MenuItemId: 1, MenuSettingsByProgramId: 123, Name: 'Item 1', Path: '/main/account/detail-account', Order: 1, Active: true },
        { MenuItemId: 2, MenuSettingsByProgramId: 123, Name: 'Item 2', Path: '/main/dashboard/monitoring-report', Order: 2, Active: false },
        { MenuItemId: 3, MenuSettingsByProgramId: 123, Name: 'Item 3', Path: '/main/account/points', Order: 3, Active: true }
      ]
    };

    saveSession(mockMenu, 'menuProfile');

    component.getMenu();

    expect(component.menu).toEqual(mockMenu);
    expect(component.listMenu).toEqual([
      { MenuItemId: 1, MenuSettingsByProgramId: 123, Name: 'Item 1', Path: '/main/account/detail-account', Order: 1, Active: true },
      { MenuItemId: 3, MenuSettingsByProgramId: 123, Name: 'Item 3', Path: '/main/account/points', Order: 3, Active: true }
    ]);
  });

  it('should return correct icon for given path', () => {
    expect(component.getIconForPath('/main/account/detail-account')).toBe('person');
    expect(component.getIconForPath('/main/dashboard/monitoring-report')).toBe('insert_drive_file');
    expect(component.getIconForPath('/main/account/my-orders')).toBe('local_shipping');
    expect(component.getIconForPath('/main/account/points')).toBe('flag');
    expect(component.getIconForPath('/main/account/change-password')).toBe('lock');
    expect(component.getIconForPath('/unknown/path')).toBe('star');
  });

  it('should navigate to points page when misPuntos is called', () => {
    component.misPuntos();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/main/account/points']);
  });

  it('should open confirm dialog and logout if confirmed', () => {
    component.logout();
    expect(dialogServiceSpy.openConfirmDialog).toHaveBeenCalledWith('¿Estás seguro que quieres cerrar sesión?', jasmine.anything());
    expect(dialogRefSpy.afterClosed).toHaveBeenCalled();

  }); 

});
