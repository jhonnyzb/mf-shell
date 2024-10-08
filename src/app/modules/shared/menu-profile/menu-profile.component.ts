import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { GTMSelectContent } from "src/app/core/models/gtm-models/gtmSelectContent.model";
import { DialogParams } from "src/app/core/models/insite/dialogParams.model";
import { FastMenuItemModel } from "src/app/core/models/response/fastMenuItem.model";
import { GetQuickMenuModel } from "src/app/core/models/response/fastMenuListResponse.model";
import { ResponseBaseModel } from "src/app/core/models/response/responseBase.model";
import { ErrorResponseModel } from "src/app/core/models/response/responseError.model";
import { AuthRepository } from "src/app/core/repositories/auth.repository";
import { GtmDispatchEventsRepository } from "src/app/core/repositories/gtmDispatchEvent.repository";
import { ConfigUtil } from "src/app/core/utils/ConfigUtil";
import { DialogService } from "src/app/core/utils/dialog.service";
import { getSession, saveSession } from "src/app/core/utils/encryptData";
import { LoginValeproResponseModel } from "src/app/infrastructure/dto/response/loginValeproResponse.model";

@Component({
  selector: "app-menu-profile",
  templateUrl: "./menu-profile.component.html",
  styleUrls: ["./menu-profile.component.scss"],
})
/**
 * Componente que representa el menú de perfil.
 */
export class MenuProfileComponent implements OnInit {
  @Input() contentClass!: string;

  selectedOption: any;
  @Output() chooseOption = new EventEmitter();
  user: LoginValeproResponseModel;
  menu: GetQuickMenuModel = getSession<GetQuickMenuModel>('menuProfile');
  listMenu: FastMenuItemModel[] = [];
  iconMenuUser: string;

  constructor(
    private router: Router,
    private configUtil: ConfigUtil,
    private dialogService: DialogService,
    private gtmEventRepository: GtmDispatchEventsRepository,
    private authRepository: AuthRepository

  ) {
    if (sessionStorage.getItem("menuSelectedOption") != null) {
      this.selectedOption =
        getSession('menuSelectedOption');
    }
    setTimeout(() => {
      this.getMenu();
    }, 400);

    this.user = getSession<LoginValeproResponseModel>('accountValepro');
  }

  ngOnInit(): void {
    this.getMenu();
  }

  /**
   * Obtiene el menú del perfil.
   *
   * @returns El menú del perfil.
   */
  getMenu() {
    this.menu = getSession<GetQuickMenuModel>('menuProfile');
    this.listMenu = this.menu.MenuItems.filter(x => x.Active);

  }

  /**
   * Get the selected option from the menu
   * @param path
   * @returns
   */
  getIconForPath(path: string): string {
    switch (path) {
      case "/main/account/detail-account":
        return 'person';
      case "/main/dashboard/monitoring-report":
        return 'insert_drive_file';
      case "/main/account/my-orders":
        return 'local_shipping';
      case "/main/account/points":
        return 'flag';
      case "/main/account/change-password":
        return 'lock';
      default:
        return 'star';
    }
  }

  misPuntos() {
    this.router.navigate(["/main/account/points"]);
  }

  /**
   * Cierra la sesión del usuario.
   */
  logout() {
    let dialogParams: DialogParams = {
      success: false,
      confirmText: "Sí",
      msg: undefined,
      page: undefined
    };
    this.dialogService
      .openConfirmDialog("¿Estás seguro que quieres cerrar sesión?", dialogParams)
      .afterClosed()
      .subscribe((confirmado: boolean) => {
        if (confirmado) {
          this.authRepository.logoutUserAuth().subscribe({
            next: (response: ResponseBaseModel<null>) => {
              this.sendGtmLogoutData();
              this.configUtil.logout();
              this.router.navigate(['/login']);
            },
            error: (response: ResponseBaseModel<ErrorResponseModel[]>) => {
              this.sendGtmLogoutData();
              this.configUtil.logout();
              this.router.navigate(['/login']);
            },
          });
        }
      });

  }

  /**
   * Navega a la opción seleccionada del menú.
   *
   * @param item - El objeto que representa la opción seleccionada del menú.
   * @returns void
   */
  goTo(item: any) {
    this.chooseOption.emit()
    this.sendGtmData(item);
    if (item.NombreObjeto == "logout-system") {
      this.logout();
      return;
    }
    saveSession(JSON.stringify(item.Nombre), 'menuSelectedOption');
  }

  /**
   * Envía datos a GTM.
   *
   * @param descripcion - La descripción del contenido seleccionado.
   */
  sendGtmData(descripcion: any) {
    let tagData: GTMSelectContent = {
      event: "Select_content",
      ParameterTarget: "Home",
      ParameterType: 'button',
      ParameterCategory: "Menu Perfil de Usuario",
      IDAccount: this.user.AccountId,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      UserName: this.user.UserName,
      ParameterText: descripcion.Name,
      ParameterItemID: '',
    };
    this.gtmEventRepository.sendEvent(tagData);
  }

  /**
   * Envía datos de cierre de sesión a GTM.
   *
   * @remarks
   * Este método envía los datos necesarios para realizar un seguimiento de la acción de cierre de sesión en GTM (Google Tag Manager).
   *
   * @param {GTMSelectContent} tagData - Los datos del evento de cierre de sesión.
   * @returns {void}
   *
   * @example
   * // Ejemplo de uso:
   * sendGtmLogoutData();
   */
  sendGtmLogoutData() {
    let tagData: GTMSelectContent = {
      event: "select_content",
      ParameterTarget: "Perfil",
      ParameterType: "botón",
      ParameterCategory: "Cerrar sesión",
      UserName: this.user.UserName,
      IDAccount: this.user.AccountId,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      ParameterText: "Cerrar sesión - confirmación",
      ParameterItemID: "0"
    };
    this.gtmEventRepository.sendEvent(tagData);
  }
}
