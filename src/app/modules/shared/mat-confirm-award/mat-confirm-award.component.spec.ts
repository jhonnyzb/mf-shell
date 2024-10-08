import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatConfirmAwardComponent } from './mat-confirm-award.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIcon } from '@angular/material/icon';
import { saveSession } from 'src/app/core/utils/encryptData';
import { Router } from '@angular/router';

describe('MatConfirmAwardComponent', () => {
  let component: MatConfirmAwardComponent;
  let fixture: ComponentFixture<MatConfirmAwardComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<MatConfirmAwardComponent>>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [MatConfirmAwardComponent, MatIcon],
      imports: [RouterTestingModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MatConfirmAwardComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load operators from sessionStorage', () => {
    const mockOperators = [{ CodeId: 1, Text: 'Claro' }];
    saveSession(mockOperators, 'wr-c-operatorsphone');
    component.getOperatorPhone();
    expect(component.operators).toEqual(mockOperators);
  });

  it('should close dialog with flag false and null phoneId', () => {
    component.closeDialog();
    expect(dialogRefSpy.close).toHaveBeenCalledWith({ flag: false, phoneId: null });
  });

  it('should call close with false when goUpdateData is called', () => {

    component.goUpdateData();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/main/account/detail-account']);
  });
});
