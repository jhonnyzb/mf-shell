import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatConfirmDialogComponent } from './mat-confirm-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

describe('MatConfirmDialogComponent', () => {
  let component: MatConfirmDialogComponent;
  let fixture: ComponentFixture<MatConfirmDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<MatConfirmDialogComponent>>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ MatConfirmDialogComponent, MatIcon],
      imports: [RouterTestingModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }, 
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatConfirmDialogComponent);
    component = fixture.componentInstance;
  });

 
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with false in closeDialog', () => {
    component.closeDialog();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });
  
  it('should close the dialog with false in cerrarDialogo', () => {
    component.cerrarDialogo();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });

  it('should close the dialog with true when data.page is null in confirmado', () => {
    component.data.page = null;
    component.confirmado();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should close the dialog with true when data.page not is null in confirmado', () => {
    component.data.page = '/some';
    component.confirmado();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
    expect(routerSpy.navigate).toHaveBeenCalled();
  });

});
