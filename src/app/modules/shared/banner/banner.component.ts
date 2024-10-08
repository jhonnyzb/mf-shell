import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GTMSelectContent } from "src/app/core/models/gtm-models/gtmSelectContent.model";
import { BoardEntityModel, ListBoardsResponseModel } from "src/app/core/models/response/listBoardsResponse.model";
import { GtmDispatchEventsRepository } from "src/app/core/repositories/gtmDispatchEvent.repository";
import { ConfigUtil } from "src/app/core/utils/ConfigUtil";
import { getSession } from "src/app/core/utils/encryptData";
import { LoginValeproResponseModel } from "src/app/infrastructure/dto/response/loginValeproResponse.model";
import { CuentasDto } from "src/app/infrastructure/dto/valefiel/cuentas.dto";

@Component({
  selector: "app-banner",
  templateUrl: "./banner.component.html",
  styleUrls: ["./banner.component.scss"],
})
/**
 * Componente de banner.
 */
export class BannerComponent implements OnInit {

  slickInit($event: { event: any; slick: any; }) {
  }

  sections: BoardEntityModel[] = [];
  account: CuentasDto;
  isSlideMoving: boolean = false;
  user: LoginValeproResponseModel;

  constructor(
    private configUtil: ConfigUtil,
    private router: Router,
    private gtmEventRepository: GtmDispatchEventsRepository
  ) {
    document.addEventListener('sectionsEvent', (event: any) => {
      this.loadSection();
    });

    this.user = getSession<LoginValeproResponseModel>('accountValepro');

  }

  ngOnInit() {
    this.loadSection();
  }

  /**
   * Carga las secciones del banner.
   *
   * @param {CuentasDto} account - La cuenta del usuario.
   * @param {ListBoardsResponseModel} allSections - Todas las secciones disponibles.
   */
  loadSection() {
    this.sections = [];
    this.account = getSession<CuentasDto>('account');
    const allSections = getSession<ListBoardsResponseModel>('sections');
    if (allSections != null && allSections.boardEntities) {
      this.sections = allSections.boardEntities.filter(e => e.boardTypeId == 4);
    }
  }

  /**
   * Configuración del componente de banner.
   *
   * @typedef {Object} BannerConfig
   * @property {boolean} swipe - Indica si se permite el deslizamiento de los slides.
   * @property {boolean} firstMobile - Indica si se muestra el primer slide en dispositivos móviles.
   * @property {number} slidesToShow - El número de slides que se muestran a la vez.
   * @property {number} slidesToScroll - El número de slides que se desplazan a la vez.
   * @property {boolean} infinite - Indica si el desplazamiento es infinito.
   * @property {boolean} arrows - Indica si se muestran las flechas de navegación.
   * @property {boolean} autoplay - Indica si se reproduce automáticamente el banner.
   * @property {number} autoplaySpeed - La velocidad de reproducción automática en milisegundos.
   * @property {boolean} pauseOnFocus - Indica si la reproducción automática se pausa al enfocar el banner.
   * @property {string} nextArrow - El HTML del elemento que representa la flecha de siguiente.
   * @property {string} prevArrow - El HTML del elemento que representa la flecha de anterior.
   * @property {Object[]} responsive - Configuraciones específicas para diferentes breakpoints.
   * @property {number} responsive.breakpoint - El punto de quiebre en el que se aplican las configuraciones.
   * @property {Object} responsive.settings - Las configuraciones específicas para el breakpoint.
   * @property {boolean} responsive.settings.arrows - Indica si se muestran las flechas de navegación en el breakpoint específico.
   */
  config = {
    swipe: true,
    firstMobile: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnFocus: true,
    nextArrow: '<div class="icon-arrow-right"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div>',
    prevArrow: '<div class="icon-arrow-left"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></div>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false, // Desactiva las flechas en pantallas más pequeñas que 720px
        },
      }
    ],
  };

  /**
   * Navega a la URL especificada por el banner.
   *
   * @param banner - El objeto del banner que contiene la URL y el nombre.
   */
  navigation(banner: BoardEntityModel) {
    if (this.isSlideMoving) {
      return;
    }
    this.sendGtmData(banner);
    if (banner.url) {
      this.configUtil.setUrl(banner.url, banner.name);
      this.router.navigate(["main/content"]);
    }
  }

  /**
   *
   * @param banner
   */
  sendGtmData(banner: BoardEntityModel) {
    let tagData: GTMSelectContent = {
      event: "select_content",
      ParameterTarget: "Home",
      ParameterType: "Imagen Carrusel",
      ParameterCategory: "Banners",
      IDAccount: this.user.AccountId,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      UserName: this.user.UserName,
      ParameterText: banner.name,
      ParameterItemID: banner.boardId.toString()
    };
    this.gtmEventRepository.sendEvent(tagData);
  }

  /**
   * Método que se ejecuta antes de que ocurra un cambio en el componente de banner.
   * Este método establece la variable isSlideMoving en true.
   */
  beforeChange() {
    this.isSlideMoving = true;
  }

  /**
   * Método que se ejecuta después de que se produce un cambio.
   *
   * @param none
   * @returns void
   */
  afterChange() {
    this.isSlideMoving = false;
  }
}
