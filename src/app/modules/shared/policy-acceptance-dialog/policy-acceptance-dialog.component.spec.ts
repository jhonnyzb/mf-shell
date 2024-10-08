import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyAcceptanceDialogComponent } from './policy-acceptance-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { PolicyRepository } from 'src/app/core/repositories/policy.repository';
import { PolicyAcceptanceRequestModel } from 'src/app/core/models/request/policyRequest.model';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { Observable, of } from 'rxjs';

class MockPolicyRepository extends PolicyRepository {
  updatePolicyAcceptance(requestModel: PolicyAcceptanceRequestModel): Observable<ResponseBaseModel<null>>{
    const mockResponse: ResponseBaseModel<null> = {
      codeId: 200,
      message: '',
      data: null
    };
    return of(mockResponse);
  }
}

describe('PolicyAcceptanceDialogComponent', () => {
  let component: PolicyAcceptanceDialogComponent;
  let fixture: ComponentFixture<PolicyAcceptanceDialogComponent>;
  let policyRepository: PolicyRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyAcceptanceDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: PolicyRepository, useClass: MockPolicyRepository },
      ]
    });
    fixture = TestBed.createComponent(PolicyAcceptanceDialogComponent);
    component = fixture.componentInstance;
    policyRepository = TestBed.inject(PolicyRepository);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
