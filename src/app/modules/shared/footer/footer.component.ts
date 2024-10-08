import { Component, OnInit } from "@angular/core";
import { GTMSelectContent } from "src/app/core/models/gtm-models/gtmSelectContent.model";
import { FooterResponseModel } from "src/app/core/models/response/footerResponse.model";
import { GtmDispatchEventsRepository } from "src/app/core/repositories/gtmDispatchEvent.repository";
import { ConfigUtil } from "src/app/core/utils/ConfigUtil";
import { getSession } from "src/app/core/utils/encryptData";
import { LoginValeproResponseModel } from "src/app/infrastructure/dto/response/loginValeproResponse.model";
import { CuentasDto } from "src/app/infrastructure/dto/valefiel/cuentas.dto";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
/**
 * Componente de pie de página.
 */
export class FooterComponent implements OnInit {
  user!: LoginValeproResponseModel;
  dataFooter: FooterResponseModel = getSession<FooterResponseModel>('formFooter');
  account!: CuentasDto;

  constructor(
    private configUtil: ConfigUtil,
    private gtmEventRepository: GtmDispatchEventsRepository
  ) { }

  /**
   * Método de ciclo de vida que se ejecuta después de que el componente ha sido inicializado.
   * @async
   * @returns {Promise<void>} Una promesa que se resuelve cuando la inicialización ha sido completada.
   */
  async ngOnInit() {
    while (!this.dataFooter) {
      await this.delay(100);
      this.dataFooter = getSession<FooterResponseModel>('formFooter');
    }
    this.account = getSession<CuentasDto>('account');
    this.user = getSession<LoginValeproResponseModel>('accountValepro');
  }

  /**
   * Retrasa la ejecución durante un período de tiempo especificado en milisegundos.
   * @param ms El número de milisegundos para retrasar la ejecución.
   * @returns Una promesa que se resuelve después de que se haya completado el retraso.
   */
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  /**
   * Navegación a una URL específica.
   *
   * @param name - El nombre de la URL.
   * @param url - La URL a la que se desea navegar.
   * @param tag - La etiqueta para enviar datos a Google Tag Manager.
   */
  navigation(name: string, url: string, tag: string) {
    this.sendGtmData(tag);
    this.configUtil.setUrl(url, name);
  }

  /**
   * Envía datos a GTM.
   *
   * @param name - El nombre del contenido seleccionado.
   */
  sendGtmData(name: string) {
    let tagData: GTMSelectContent = {
      event: "Select_content",
      IDAccount: this.user.AccountId,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      UserName: this.user.UserName,
      ParameterTarget: "Home",
      ParameterType: "button",
      ParameterCategory: "Home-Vale PRO",
      ParameterText: name,
      ParameterItemID: ""
    };
    this.gtmEventRepository.sendEvent(tagData);
  }
}
