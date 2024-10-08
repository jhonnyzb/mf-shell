import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { PolicyConfigFormMapper } from 'src/app/core/mappers/policyConfigForm.mapper';
import { PolicyService } from './policy.service';
import { PolicyAcceptanceRequestModel } from 'src/app/core/models/request/policyRequest.model';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';

describe('YourService', () => {
  let service: PolicyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PolicyService]
    });

    service = TestBed.inject(PolicyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should update policy acceptance and return response', () => {
    const requestPayload: PolicyAcceptanceRequestModel = { 
        AcceptHabeasData: true,
        AcceptTermsAndConditions: true
    };
    const mockResponse: ResponseBaseModel<null> = {
      codeId: 200,
      message: 'Success',
      data: null
    };

    service.updatePolicyAcceptance(requestPayload).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiValepro}/auth-user-api/api/v1/user/policy-acceptance`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(PolicyConfigFormMapper.policyAcceptanceConfirmFormDomainToApi(requestPayload));
    req.flush(mockResponse);
  });

});
