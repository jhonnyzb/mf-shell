import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { saveSession } from './core/utils/encryptData';
import { applyTheme } from './core/utils/styleLoad';
import { applyFonts } from './core/utils/fontsLoad';
import { HttpErrorResponse } from '@angular/common/http';
import { UrlToProgramModel } from './core/models/response/urlToProgram.model';
import { ResponseBaseModel } from './core/models/response/responseBase.model';
import { ProgramRequestModel } from './core/models/request/programRequest.model';
import { LookAndFeelRepository } from './core/repositories/lookAndFeel.repository';
import { ToastGenericRepository } from './core/repositories/toastGeneric.repository';
import { GtmEventsRepository } from './core/repositories/gtmEvents.repository';
import { ManifestService } from './infrastructure/services/manifest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
/**
 * Componente principal de la aplicación.
 *
 * @remarks
 * Este componente es responsable de cargar el programa actual, gestionar eventos de navegación, cargar scripts de Google Tag Manager, activar/desactivar la barra de configuración, obtener un programa específico, cargar el favicon de la aplicación, cambiar el estado del menú móvil y emitir eventos de derechos de autor.
 */
export class AppComponent {

  previousUrl: any;
  activeSpinner: boolean = false;
  opened!: boolean;
  isLoading: boolean = false;
  user: any = {};
  account: any = {};
  isCondensed = false;
  programId: number;

  constructor(
    route: ActivatedRoute,
    private lookAndFeelRepository: LookAndFeelRepository,
    private toastGenericRepository: ToastGenericRepository,
    private router: Router,
    private renderer: Renderer2,
    private gtmEventsRepository: GtmEventsRepository,
    private manifestService: ManifestService
  ) {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          if (this.previousUrl) {
            this.renderer.removeClass(document.body, this.previousUrl);
          }
          const currentUrlSlug = event.url.split('?')[0].slice(1);

          if (currentUrlSlug) {
            this.renderer.addClass(document.body, currentUrlSlug.split('/')[0].slice(0));
          } else {
            this.renderer.addClass(document.body, "default");
          }
          this.previousUrl = currentUrlSlug;
        }
      });
  }

  /**
   * Método de ciclo de vida que se ejecuta después de que se haya inicializado el componente.
   * Carga el programa y agrega un listener para el evento 'gtmEvent'.
   *
   * @returns void
   */
  ngOnInit(): void {
    this.loadProgram();
    document.addEventListener('gtmEvent', (event: any) => {
      this.gtmEventsRepository.sendEvent(event.detail);
    });
  }


  /**
 * Carga el programa actual.
 *
 * @description Esta función carga el programa actual obteniendo la URL y realizando una solicitud al servidor.
 * Si la URL es 'http://localhost:4200', se cambia a 'https://stage-website.valefielcomercios.com'.
 *
 * @param {ProgramRequestModel} programRequest - El objeto que contiene la URL del programa.
 *
 * @returns {void}
 */
  loadProgram() {
    let url = window.location.origin;
    if (url == 'http://localhost:4200') {
      url = 'https://stage-website.valefielcomercios.com'
    }
    let programRequest: ProgramRequestModel = {
      URL: url
    }
    this.lookAndFeelRepository.getProgram(programRequest).subscribe({
      next: (data: ResponseBaseModel<UrlToProgramModel>) => {
        this.programId = data.data.ProgramId;
        saveSession(data.data.ProgramId, 'programId');
        this.loadFavicon(data.data.Name, data.data.LookAndFeel.Icon)
        localStorage.setItem('PasswordLength', data.data.PasswordMinLength.toString());
        saveSession(data.data.CanRegisterOnWebResponsive, 'RegisterOnWebResponsive')
        saveSession(data.data.LookAndFeel.UseBigBackground, 'useBigImage');
        this.loadGtmScripts(data.data.TagManagerWebResponsive);
        saveSession(data.data.LookAndFeel, 'configVisual');
        saveSession(data.data.PasswordMinLength, 'passwordMinlength');
        this.emitEventCopyright(data.data.Copyright);
        applyTheme(data.data.LookAndFeel);
        applyFonts(data.data.LookAndFeel);
        const miEvento = new CustomEvent('programIsLoaded');
        document.dispatchEvent(miEvento);
        this.updateManifest(data.data.Name, data.data.LookAndFeel.ImageBackgroundLogin, data.data.LookAndFeel.PrimaryColor, data.data.LookAndFeel.TertiaryColor );
      }, error: (error: HttpErrorResponse) => {
        this.toastGenericRepository.genericErrorMessage();
      }
    })
  }

  /**
   * Carga los scripts de Google Tag Manager en el documento.
   *
   * @param gtmCode - El código de Google Tag Manager.
   */
  loadGtmScripts(gtmCode: string) {
    const scriptUrlGtm = document.createElement('script');
    scriptUrlGtm.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${gtmCode}`);
    document.head.appendChild(scriptUrlGtm);
    const scriptGtmSend = document.createElement('script');
    scriptGtmSend.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', '${gtmCode}');
        `
    document.head.appendChild(scriptGtmSend);

    const scriptGtmRead = document.createElement('script');
    scriptGtmRead.innerHTML = `
    window.addEventListener('message', function (event) {
      try {
        var dataValidate = event.data;
        if (dataValidate != undefined) {
          var data = JSON.parse(event.data);
          var dataLayer = window.dataLayer || (window.dataLayer = [0]);
          var evenName = data.event;
          gtag('event', evenName, data);
        }
      } catch (error) { }

    });
    `
    document.head.appendChild(scriptGtmRead);
  }

  /**
   * Activa o desactiva la clase "right-bar-enabled" en el elemento body del documento.
   *
   * @returns {void}
   */
  onSettingsButtonClicked() {
    document.body.classList.toggle("right-bar-enabled");
  }

  /**
   * Carga el favicon de la aplicación y actualiza el título de la página.
   *
   * @param progamName - El nombre del programa que se utilizará como título de la página.
   * @param iconUrl - La URL del favicon que se utilizará en la página.
   */
  loadFavicon(progamName: string, iconUrl: string) {
    document.title = progamName;
    let iconPage = document.getElementById('pageIcon') as HTMLLinkElement;
    iconPage.href = iconUrl;
  }

  /**
   * Cambia el estado del menú móvil.
   *
   * @remarks
   * Esta función alterna el valor de la propiedad `isCondensed`, agrega o remueve las clases CSS "sidebar-enable" y "vertical-collpsed" al elemento `body` del documento, y remueve la clase "vertical-collpsed" si el ancho de la pantalla es menor o igual a 768 píxeles.
   *
   * @returns No devuelve ningún valor.
   */
  onToggleMobileMenu() {
    this.isCondensed = !this.isCondensed;
    document.body.classList.toggle("sidebar-enable");
    document.body.classList.toggle("vertical-collpsed");

    if (window.screen.width <= 768) {
      document.body.classList.remove("vertical-collpsed");
    }
  }

  /**
   * Emite un evento de derechos de autor.
   *
   * @param copyright El texto de los derechos de autor.
   */
  emitEventCopyright(copyright: string) {
    localStorage.setItem('Copyright', copyright)
    const miEvento = new CustomEvent('copyrightLoad', { detail: copyright });
    document.dispatchEvent(miEvento);
  }

  updateManifest(name: string, icon: string, theme_color: string, background_color: string){
    this.manifestService.updateManifest(name, icon, theme_color, background_color);
  }

}
