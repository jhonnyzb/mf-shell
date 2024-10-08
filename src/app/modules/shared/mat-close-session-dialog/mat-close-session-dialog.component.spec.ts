import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCloseSessionDialogComponent } from './mat-close-session-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

describe('MatCloseSessionDialogComponent', () => {
  let component: MatCloseSessionDialogComponent;
  let fixture: ComponentFixture<MatCloseSessionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatCloseSessionDialogComponent, MatIcon ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }, 
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } } 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatCloseSessionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
