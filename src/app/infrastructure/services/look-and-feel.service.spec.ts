import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { CategoryModel } from 'src/app/core/models/response/categories.model';
import { CategoryDto } from '../dto/response/categories.dto';
import { LookAndFeelService } from './look-and-feel.service';
import { ProgramRequestModel } from 'src/app/core/models/request/programRequest.model';
import { ResponseBaseDto } from '../dto/response/responseBase.dto';
import { UrlToProgramDto } from '../dto/response/program.dto';
import { LookAndFeelMapper } from 'src/app/core/mappers/lookAndFeel.mapper';

describe('CategoryService', () => {
    let service: LookAndFeelService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [LookAndFeelService],
        });
        service = TestBed.inject(LookAndFeelService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should fetch program data correctly', () => {
        const mockRequest: ProgramRequestModel = {
            URL: 'https://dev-website.valefielcomercios.com',
        };

        const mockResponse: ResponseBaseDto<UrlToProgramDto> = {
            codeId: 200,
            message: 'Success',
            data: {
                programId: 1,
                name: 'Ejemplo de Programa',
                passwordMinLength: 8,
                canRegisterOnWebResponsive: true,
                tagManagerWebGestor: 'TAG-XXX',
                tagManagerWebResponsive: 'TAG-YYY',
                copyright: '©2024 Empresa Ejemplo',
                lookAndFeel: {
                    lookAndFeelId: 101,
                    imageBackgroundLogin: 'ruta/a/imagen-fondo-login.jpg',
                    bigImageBackgroundLogin: 'ruta/a/gran-imagen-fondo-login.jpg',
                    useBigBackground: true,
                    primaryColor: '#3498db',
                    secondaryColor: '#2ecc71',
                    tertiaryColor: '#e74c3c',
                    background: '#ecf0f1',
                    fontFamilyName: 'Arial, sans-serif',
                    icon: 'ruta/a/icono.png'
                }
            }
        };

        service.getProgram(mockRequest).subscribe(response => {
            expect(response.codeId).toEqual(mockResponse.codeId);
            expect(response.message).toEqual(mockResponse.message);
            expect(response.data.ProgramId).toEqual(mockResponse.data.programId);
            expect(response.data.LookAndFeel.LookAndFeelId).toEqual(mockResponse.data.lookAndFeel.lookAndFeelId);
            expect(response.data.Name).toEqual(mockResponse.data.name);
        });

        const req = httpMock.expectOne(`${environment.apiValepro}/program-public-api/api/v1/PublicProgram/urlToProgramId`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(LookAndFeelMapper.programDomainToApi(mockRequest)); // Verifica que el mapeo sea correcto
        req.flush(mockResponse);
    });

});
