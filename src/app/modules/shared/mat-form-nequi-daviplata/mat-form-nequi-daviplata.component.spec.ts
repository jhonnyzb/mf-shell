import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFormNequiDaviplataComponent } from './mat-form-nequi-daviplata.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('MatFormNequiDaviplataComponent', () => {
  let component: MatFormNequiDaviplataComponent;
  let fixture: ComponentFixture<MatFormNequiDaviplataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatFormNequiDaviplataComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }, // Proveer datos vacíos para MAT_DIALOG_DATA
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } } // Proveer un espía para MatDialogRef
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatFormNequiDaviplataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
