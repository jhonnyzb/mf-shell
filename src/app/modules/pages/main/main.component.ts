import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { getSession, saveSession } from "src/app/core/utils/encryptData";
import { ResponseBaseModel } from "src/app/core/models/response/responseBase.model";
import { LoginValeproResponseModel } from "src/app/infrastructure/dto/response/loginValeproResponse.model";
import { BoardEntityModel, ListBoardsResponseModel } from "src/app/core/models/response/listBoardsResponse.model";
import { BoardRepository } from "src/app/core/repositories/board.repository";
import { Parameters } from "src/app/core/enum/parametersTable.enum";
import { ListBoardsRequestModel } from "src/app/core/models/request/listBoardRequest.model";
import { ErrorResponseModel } from "src/app/core/models/response/responseError.model";
import { PolicyAcceptanceDialogComponent } from "../../shared/policy-acceptance-dialog/policy-acceptance-dialog.component";
import { PopupInformationComponent } from "../../shared/popup-information/popup-information.component";
import { UtilsTitle } from "src/app/core/utils/UtilsTitle";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})

/**
 * Componente principal de la aplicación.
 *
 * @remarks
 * Este componente se encarga de mostrar la página principal de la aplicación. Contiene la lógica para obtener los recursos del mensaje, abrir el diálogo de aceptación de políticas, abrir el modal de información, obtener el usuario de la sesión actual y ordenar una lista de artículos destacados.
 *
 * @example
 * ```typescript
 * const mainComponent = new MainComponent();
 * mainComponent.getMessageResources();
 * mainComponent.openPolicyDialog();
 * mainComponent.openModalInfo();
 * mainComponent.getUser();
 * mainComponent.sortFeaturedArticles([]);
 * ```
 */
export class MainComponent implements OnInit {


  listPopups: BoardEntityModel[] = [];
  listFeaturedArticles: any[] = [];
  isLoading: boolean = false;
  isFeaturedArticlesLoaded: boolean = false;
  user!: LoginValeproResponseModel;

  constructor(
    private boardRepository: BoardRepository,
    public dialog: MatDialog,
    private utilsTitle: UtilsTitle
  ) {
    this.utilsTitle.suscribeRoutesTitle();
  }

  ngOnInit(): void {
    this.getMessageResources();
    setTimeout(() => {
      this.getUser();
      this.openPolicyDialog();
    }, 400);
  }

  /**
   * Obtiene los recursos del mensaje.
   *
   * @description Esta función se utiliza para obtener los recursos del mensaje. Realiza una solicitud al servidor para obtener una lista de tableros y guarda los tableros segmentados en la sesión. Luego, filtra los tableros por tipo de tablero y los agrega a la lista de ventanas emergentes. Finalmente, abre el modal de información.
   *
   * @param {void} - No recibe ningún parámetro.
   *
   * @returns {void} - No devuelve ningún valor.
   *
   * @throws {ResponseBaseModel<ErrorResponseModel[]>} - Si ocurre un error en la solicitud al servidor, se lanza una excepción con el mensaje de error.
   */
  getMessageResources(): void {
    this.isLoading = true;
    const request: ListBoardsRequestModel = {
      programId: getSession<number>('programId'),
      boardTypeId: Parameters.boardTypeId,
      isWebResponsive: true
    };
    this.boardRepository.listBoards(request).subscribe({
      next: (result: ResponseBaseModel<ListBoardsResponseModel>) => {
        this.isLoading = false;


        let listResultSegmented: BoardEntityModel[] = [];
        let counter = 0;
        result.data.boardEntities.forEach((entity) => {
          let section = entity.segments;
          if (section) {
            listResultSegmented.push(entity);
            saveSession(new ListBoardsResponseModel(listResultSegmented), 'sections');
          }
          counter++;
          if (result.data.boardEntities.length == counter) {
            const sectionsEvent = new CustomEvent('sectionsEvent');
            document.dispatchEvent(sectionsEvent);
          }
        });

        let filteredListPopup = listResultSegmented.filter(entity => entity.boardTypeId == 2);
        filteredListPopup.forEach(entity => {
          this.listPopups.push(entity);
        });
        this.openModalInfo();
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        this.isLoading = false;
      }
    });
  }

  /**
   * Abre el diálogo de aceptación de políticas.
   *
   * Comprueba si el usuario ha aceptado la política de protección de datos y los términos y condiciones.
   * Si el usuario no ha aceptado alguna de estas políticas, se abre el diálogo de aceptación de políticas.
   *
   * @returns {void}
   */
  openPolicyDialog(): void {
    let sesionData = getSession<LoginValeproResponseModel>('accountValepro');
    if (!sesionData.AcceptHabeasData || !sesionData.AcceptTermsAndConditions) {
      this.dialog.open(PolicyAcceptanceDialogComponent, {
        width: '624px',
        hasBackdrop: true,
        disableClose: true
      });
    }
  }

  /**
   * Abre un modal de información.
   *
   * @remarks
   * Este método verifica si existe un valor almacenado en la sesión con la clave "popupInfo".
   * Si existe y su valor es verdadero, no se realiza ninguna acción.
   * Si no existe o su valor es falso, se recorre la lista de popups y se muestra un modal para cada popup que esté vigente en la fecha actual.
   * Al cerrar cada modal, se incrementa el contador y se verifica si se han mostrado todos los popups vigentes.
   * En caso afirmativo, se guarda el valor "true" en la sesión con la clave "popupInfo".
   */
  openModalInfo(): void {
    if (sessionStorage.getItem("popupInfo")) {
      let showPopupInfo = getSession<boolean>('popupInfo');
      if (showPopupInfo || showPopupInfo != null) {
        return;
      }
    }
    let count = 0;
    let countInfoVigente = 0;
    let date2 = new Date();
    date2.setHours(0, 0, 0, 0);
    let date = new Date(date2.toDateString());
    this.listPopups.forEach((element) => {
      let dateVigente = new Date(element.endDateValidity);
      let dateStart = new Date(element.startDateValidity);
      if (dateStart <= date && dateVigente >= date) {
        countInfoVigente++;
        const dialogRef = this.dialog.open(PopupInformationComponent, {
          data: element,
          disableClose: true,
        });
        dialogRef.afterClosed().subscribe(() => {
          count++;
          if (countInfoVigente === count) {
            saveSession("true", 'popupInfo');
          }
        });
      }
    });
  }

  /**
   * Obtiene el usuario de la sesión actual.
   *
   * @returns El usuario de la sesión actual.
   */
  getUser() {
    this.user = getSession<LoginValeproResponseModel>('accountValepro');
  }

  /**
   * Ordena una lista de artículos destacados.
   * @param list - La lista de artículos a ordenar.
   * @returns La lista de artículos ordenada.
   */
  sortFeaturedArticles(list: any[]) {
    if (list) {
      list.sort((a, b) => {
        //Ordenar para que se muestre primero los de vista amplia
        if (
          a.ParametrosExtra == undefined ||
          a.ParametrosExtra == null ||
          (!a.ParametrosExtra?.MostrarAmpliado &&
            b.ParametrosExtra?.MostrarAmpliado)
        ) {
          return 1;
        }
        return -1;
      });
    }
    return list;
  }

}

