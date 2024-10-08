import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { WidgetTypes } from "src/app/core/enum/widgetType";
import { GTMSelectContent } from "src/app/core/models/gtm-models/gtmSelectContent.model";
import { BoardEntityModel, ListBoardsResponseModel } from "src/app/core/models/response/listBoardsResponse.model";
import { GtmDispatchEventsRepository } from "src/app/core/repositories/gtmDispatchEvent.repository";
import { getSession, saveSession } from "src/app/core/utils/encryptData";
import { LoginValeproResponseModel } from "src/app/infrastructure/dto/response/loginValeproResponse.model";

@Component({
  selector: "app-widgets",
  templateUrl: "./widgets.component.html",
  styleUrls: ["./widgets.component.scss"],
})
/**
 * Componente que representa la visualización de widgets.
 *
 * @remarks
 * Este componente muestra una lista de widgets y permite interactuar con ellos.
 *
 * @example
 * ```typescript
 * const widgetsComponent = new WidgetsComponent();
 * widgetsComponent.showWidget();
 * ```
 *
 * @public
 */
export class WidgetsComponent implements OnInit {

  stringParams: any;
  ventanaEmergente: any;
  isSlideMoving: boolean = false;
  sections: BoardEntityModel[] = [];
  user: LoginValeproResponseModel;


  constructor(
    private router: Router,
    private gtmEventRepository: GtmDispatchEventsRepository
  ) {
    this.user = getSession<LoginValeproResponseModel>('accountValepro');
  }

  async ngOnInit() {
    while (this.sections.length === 0) {
      await this.delay(100);
      const allSections = getSession<ListBoardsResponseModel>('sections');
      if (allSections && allSections.boardEntities) {
        allSections.boardEntities.forEach(entity => {
          if (entity.boardTypeId === 1) {
            this.sections.push(entity);
          }
        });
      }
    }
    this.stringParams = `?IDPrograma=${this.user.ProgramId}&IDPersona=${this.user.PersonId}&IDCuenta=${this.user.AccountId}`;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Configuración para el componente de widgets.
   *
   * @param {boolean} arrows - Indica si se muestran las flechas de navegación.
   * @param {boolean} infinite - Indica si la navegación es infinita.
   * @param {boolean} firstMobile - Indica si se muestra el primer elemento en dispositivos móviles.
   * @param {number} slidesToScroll - El número de elementos a desplazar en cada cambio de diapositiva.
   * @param {number} slidesToShow - El número de elementos a mostrar en cada diapositiva.
   */
  config = {
    swipe: true,
    arrows: false,
    infinite: true,
    firstMobile: true,
    slidesToScroll: 3,
    slidesToShow: 3,
    autoplay:true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }
    ]
  };


  /**
   * Muestra un widget en la aplicación.
   *
   * @param widget - El widget a mostrar. Si no se proporciona, se asume como nulo.
   * @returns void
   */
  showWidget(widget: BoardEntityModel = null) {
    if (this.isSlideMoving) {
      return;
    }
    saveSession(JSON.stringify(widget), 'widgetSelected')
    this.sendGtmData(widget);
    switch (widget.openingModeId) {
      case WidgetTypes.EmbedType1:
        this.router.navigateByUrl(
          `main/widgets/detail/${widget.boardId}`
        );
        break;
      case WidgetTypes.Popup:
        if (!this.stringParams) {
          this.stringParams = `?IDPrograma=${this.user.ProgramId}&IDPersona=${this.user.PersonId}&IDCuenta=${this.user.AccountId}`;
        }
        this.ventanaEmergente = window.open(
          widget.url + this.stringParams,
          "Detalle",
          "width=1200,height=800"
        );
        break;
    }
  }

  /**
   * Objeto que contiene la información del widget.
   * @param widgets
   */
  sendGtmData(widgets: any) {
    let tagData: GTMSelectContent = {
      event: "select_content",
      ParameterTarget: "Home",
      ParameterType: 'Imagen',
      ParameterCategory: "Widgets",
      UserName: this.user.UserName,
      IDAccount: this.user.AccountId,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      ParameterText: widgets.Titulo,
      ParameterItemID: widgets.IDMensaje
    };
    this.gtmEventRepository.sendEvent(tagData);
  }

  /**
   * Método que redirige a la vista de widgets.
   */
  redirectWidgets() {
    this.sendGtmDataBenefit()
    this.router.navigate(["main/widgets"]);
  }

  /**
   * Método que se ejecuta antes de cambiar de slide.
   */
  beforeChange() {
    this.isSlideMoving = true;
  }

  /**
   * Método que se ejecuta después de cambiar de slide.
   */
  afterChange() {
    this.isSlideMoving = false;
  }
  /**
   * Método que envía el evento de GTM al hacer clic en el botón "Ver todos los beneficios".
   */
  sendGtmDataBenefit() {
    let tagData: GTMSelectContent = {
      event: "Select_content",
      ParameterTarget: "Home",
      ParameterType: 'button',
      ParameterCategory: 'Home-Vale PRO',
      IDAccount: this.user.AccountId,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      UserName: this.user.UserName,
      ParameterText: 'Ver todos los beneficios',
      ParameterItemID: ''
    }
    this.gtmEventRepository.sendEvent(tagData);
  }

}
