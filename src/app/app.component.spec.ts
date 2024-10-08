import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LookAndFeelRepository } from './core/repositories/lookAndFeel.repository';
import { ToastGenericRepository } from './core/repositories/toastGeneric.repository';
import { GtmEventsRepository } from './core/repositories/gtmEvents.repository';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ResponseBaseModel } from './core/models/response/responseBase.model';
import { UrlToProgramModel } from './core/models/response/urlToProgram.model';
import { Observable, of } from 'rxjs';
import { ProgramRequestModel } from './core/models/request/programRequest.model';
import { ProgramDto } from './infrastructure/dto/valefiel/programsResponse.dto';
import { ProgramService } from './infrastructure/services/valefiel/program-service';
import { environment } from 'src/environments/environment';
import { SpinnerComponent } from './modules/shared/spinner/spinner.component';

class MockLookAndFeelRepository extends LookAndFeelRepository {
  getProgram(programRequest: ProgramRequestModel): Observable<ResponseBaseModel<UrlToProgramModel>> {
    const mockResponse: ResponseBaseModel<UrlToProgramModel> = {
      codeId: 200,
      message: '¡Operación exitosa!',
      data: {
        ProgramId: 6,
        Name: 'VALEMAS',
        LookAndFeel: {
          Icon: 'test-icon-url',
          UseBigBackground: true,
          LookAndFeelId: 1,
          ImageBackgroundLogin: 'https://stage-resources.valepro.com.co/6/logo-valemas_2024-08-13-25-14_2024-08-13-51-42.png',
          BigImageBackgroundLogin: 'https://stage-resources.valepro.com.co/',
          PrimaryColor: '#CFC6F0',
          SecondaryColor: '#1A0C3F',
          TertiaryColor: '#F9BE2D',
          backgroundColor: '#1F134B',
          FontFamilyName: 'Euclid Circular B',
        },
        PasswordMinLength: 10,
        CanRegisterOnWebResponsive: true,
        TagManagerWebResponsive: 'G-3DWDE18934',
        TagManagerWebGestor: 'G-1HHBMK8RP0',
        Copyright: 'COPYRIGHT© 2024 Valemas S.A.S'
      }
    };
    return of(mockResponse);
  }
}

class MockToastGenericRepository extends ToastGenericRepository {
  genericErrorMessage(){}
}

class MockGtmEventsRepository extends GtmEventsRepository {
  sendEvent(){}
}

class MockProgramService {
  getProgram(programId: number, sourceId: string) {
    const mockResponse: ProgramDto = {
      IDPrograma: 1,
      Programa: 'Programa de Ejemplo',
      Descripcion: 'Descripción del programa de ejemplo.',
      EsMultiPais: true,
      URLTerminosCondicionesApp: 'https://example.com/terminos',
      URLCondicionesProgramaApp: 'https://example.com/condiciones-programa',
      URLPoliticasDivulgacionApp: 'https://example.com/politicas',
      IsVisibleURLPoliticasDivulgacionApp: true,
      URLTyCCatalogo: 'https://example.com/catalogo',
      IsVisibleActualizarVersionApp: false,
      TieneResumenDePuntos: true,
      IDTipoPrograma: 2,
      FechaInicioVigencia: new Date('2024-01-01'),
      FechaFinalVigencia: new Date('2024-12-31'),
      IDEstado: 1,
      TipoPrograma: 'Tipo Ejemplo',
      Estado: 'Activo',
      RequiereRespuestaAPreguntaDeSeguridad: true,
      RequierePreguntasParaRedemir: false,
      ValidacionIdentidadNoPreguntas: 2,
      ValidacionIdentidadNoMinimoRptasCorrectas: 3,
      NumeroCallCenterBta: '123456789',
      NumeroCallCenterPais: '987654321',
      DireccionContacto: 'Calle Ejemplo 123',
      EmailContacto: 'contacto@example.com',
      RequiereCuestionarioActivarUsuario: false,
      PermiteActualizarDatosIdentificacion: true,
      PermiteActualizarDatosBasicos: true,
      PermiteActualizarDirecciones: false,
      PermiteActualizarDatosContacto: true,
      RequiereActualizarInfoPersona: false,
      IDTipoPersona: 1,
      IDPais: 56,
      Pais: 'País Ejemplo',
      DigitosDecimales: 2,
      AppEsCerrada: false,
      InfoAppCerrada: 'La aplicación está abierta.',
      RegistroSolicitaCedula: true,
      IntentosReenvioMensajesPassword: 5,
      MensajeErrorReenvioMensajesPassword: 'Error al reenviar mensaje.',
      RequiereActualizarClave: true,
      IDActualizarDatos: 10,
      OAuthProviders: [{ provider: 'Google' }, { provider: 'Facebook' }],
      App_InfoCalendarioRedencion: 'Calendario de redención de ejemplo.',
      AccesoRedesSociales: true,
      PermiteRegistroPlataforma: true,
      IDEmpresaPromotoraPpal: 3,
      IDPunto: 7,
      PermitirCantidadEnRedencion: true,
      CantidadMaximaEnRedencion: 100,
      Error: { IDCodigo: 500, Mensaje: 'Error de ejemplo.' },
      IDMonedaGL: 840,
      HomeDefault: 'home/default',
      ActualizarTyC: true,
      MenusAcceso: [{IDPagina: 101,
        IDMenu: 202,
        PermiteAcceso: true,
        MenuTexto: 'Menú Principal',
        ObjectPosition: 1,
        AsociatedModule: 5,
        AsociatedCluster: 10,
        SubMenuSeccion: {
          SubMenus : []
        },
        Labels: {
         LabelHome: '',
         LabelServicios: ''
        },
        PageName: 'Página Ejemplo'}],
      UrlOrigen: 'https://example.com',
      SolicitaCalificacionTienda: true,
      MensajeCalificacionTienda: 'Por favor califica nuestra tienda.',
      MostrarPrimerPasoRegistro: true,
      MaximoItemsRedencion: 10,
      MensajeErrorMaximoItemsRedencion: 'Has alcanzado el máximo de items.',
      PorcentajePagoEnPuntos: 15,
      RegistrarSalesManago: false,
      MostrarWelcomeKit: true,
      iOSPruebaTienda: true,
      MostrarOnboarding: false,
      URLBienvenida: 'https://example.com/bienvenida',
      MostrarPuntos: true,
      IDOrdenamientoPremios: 5,
      AutorizadorDeCodigoParaActualizarDatos: true,
      AutorizadorDeCodigoParaRedimirPremio: false,
      PermiteLoginConCodigo: true,
      MostrarBuscador: true,
      MostrarArticulosParaTi: true,
      RecaptchaVisible: false,
      MaximoIntentosLogin: 3,
      EstadoEmailVerificado: 1,
      EstadoTelefonoMovilVerificado: 2
    };
    return of(mockResponse);
  }
}



describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let lookAndFeelRepository: LookAndFeelRepository;
  let toastGenericRepository: ToastGenericRepository;
  let gtmEventsRepository: GtmEventsRepository;
  let programService: ProgramService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, SpinnerComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: LookAndFeelRepository, useClass: MockLookAndFeelRepository },
        { provide: ToastGenericRepository, useClass: MockToastGenericRepository },
        { provide: GtmEventsRepository, useClass: MockGtmEventsRepository },
        { provide: ProgramService, useClass: MockProgramService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    lookAndFeelRepository = TestBed.inject(LookAndFeelRepository);
    toastGenericRepository = TestBed.inject(ToastGenericRepository);
    programService = TestBed.inject(ProgramService);

    // Configurar el entorno de pruebas para loadFavicon
    const linkElement = document.createElement('link');
    linkElement.id = 'pageIcon';
    linkElement.rel = 'icon';
    document.head.appendChild(linkElement);
  });

  afterEach(() => {
    const linkElement = document.getElementById('pageIcon');
    if (linkElement) {
      document.head.removeChild(linkElement);
    }
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call lookAndFeelRepository.getProgram and process the response correctly', () => {
    spyOn(lookAndFeelRepository, 'getProgram').and.callThrough();
    spyOn(localStorage, 'setItem');
    spyOn(document, 'dispatchEvent');
    spyOn(component, 'loadFavicon');
    spyOn(component, 'loadGtmScripts');
    spyOn(component, 'emitEventCopyright');

    component.loadProgram();

    expect(lookAndFeelRepository.getProgram).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('PasswordLength', '10');
    expect(component.loadFavicon).toHaveBeenCalledWith('VALEMAS', 'test-icon-url');
    expect(component.loadGtmScripts).toHaveBeenCalledWith('G-3DWDE18934');
    expect(component.emitEventCopyright).toHaveBeenCalledWith('COPYRIGHT© 2024 Valemas S.A.S');
    expect(document.dispatchEvent).toHaveBeenCalledWith(jasmine.any(CustomEvent));
  });

  it('should add GTM scripts to document.head', () => {
    const gtmCode = 'G-3DWDE18934';
    spyOn(document.head, 'appendChild');
  
    component.loadGtmScripts(gtmCode);
  
    expect(document.head.appendChild).toHaveBeenCalledTimes(3);
    expect(document.head.appendChild).toHaveBeenCalledWith(jasmine.any(HTMLScriptElement));
  });

  it('should call programService.getProgram', () => {
    spyOn(programService, 'getProgram').and.callThrough();
    spyOn(window.sessionStorage, 'setItem');
    
    const programId = 1;
    component.getProgram(programId);

    expect(programService.getProgram).toHaveBeenCalledWith(programId, environment.sourceId);
    expect(window.sessionStorage.setItem).toHaveBeenCalled();
  });

  it('should update document title and page icon', () => {
    const programName = 'Valepro';
    const iconUrl = 'https://example.com/icon.png';
    // Llamar al método
    component.loadFavicon(programName, iconUrl);
    // Verificar que el título del documento se actualizó
    expect(document.title).toBe(programName);
    // Verificar que el href del icono se actualizó
    const iconElement = document.getElementById('pageIcon') as HTMLLinkElement;
    expect(iconElement.href).toBe(iconUrl);
  });

});
