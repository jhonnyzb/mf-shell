import { HttpConfigInterceptor } from "./httpconfig.interceptor";

import { Router } from "@angular/router";
import { UserUtils } from "../utils/UserUtils";
import { ConfigUtil } from "../utils/ConfigUtil";
import { environment } from 'src/environments/environment';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { DialogService } from "../utils/dialog.service";

describe('My Interceptor', () => {
    let interceptor: HttpConfigInterceptor;
    let userUtils: UserUtils;
    let dialogService: DialogService;
    let configUtil: ConfigUtil;
    let router: Router;

    beforeEach(() => {
        userUtils = jasmine.createSpyObj('userUtils', ['getUserLogin', 'getProgramId', 'setUserLogin']);
        dialogService = jasmine.createSpyObj('dialogService', ['openConfirmDialog']);
        configUtil = jasmine.createSpyObj('configUtil', ['logout']);
        router = jasmine.createSpyObj('router', ['navigate']);
        interceptor = new HttpConfigInterceptor(router, dialogService);
    });

    it('should be created', () => {
        expect(interceptor).toBeTruthy();
    });


    describe('test to interceptor method', () => {
        const mockHandler = {
            handle: (request: HttpRequest<any>) => {
              return of(new HttpResponse({ status: 200, body: {} }));
            }
          };


        it('should add Content-Type header if missing', () => {
            const programId = 6;
            const sourceId = environment.sourceId;
            const url = `${environment.serverName} v1/programas?IDPrograma=${programId}&IDTipoEquipoOrigen=${sourceId}`;
            const request = new HttpRequest('GET', url);
            const next = mockHandler;
            const expected = new HttpRequest('GET', url, { 'Content-Type': 'application/json' });
            spyOn(request.headers, 'has').and.returnValue(false);
            spyOn(request.headers, 'set').and.callThrough();            
            const result = interceptor.intercept(request, next);
            result.subscribe(event => {
              expect(request.headers.has).toHaveBeenCalledWith('Content-Type');
              expect(request.headers.set).toHaveBeenCalledWith('Content-Type', 'application/json');
              expect(event).toEqual(jasmine.any(HttpResponse));
            });
          });
    });
   
});