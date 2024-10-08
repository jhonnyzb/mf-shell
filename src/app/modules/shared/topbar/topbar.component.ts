import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { Router } from "@angular/router";
import { LoginValeproResponseModel } from "src/app/infrastructure/dto/response/loginValeproResponse.model";
import { GTMSelectContent } from "src/app/core/models/gtm-models/gtmSelectContent.model";
import { FastMenuItemModel } from "src/app/core/models/response/fastMenuItem.model";
import { GetQuickMenuModel } from "src/app/core/models/response/fastMenuListResponse.model";
import { getSession, saveSession } from "src/app/core/utils/encryptData";
import { ConfigUtil } from "src/app/core/utils/ConfigUtil";
import { NotificationService } from "src/app/infrastructure/services/valefiel/notification.service";
import { PersonDataResponseModel } from "src/app/core/models/response/personDataResponse.model";
import { CategoryRepository } from "src/app/core/repositories/category.repository";
import { CategoryModel } from "src/app/core/models/response/categories.model";
import { ResponseBaseModel } from "src/app/core/models/response/responseBase.model";
import { FilterProductsModel } from "src/app/core/models/request/filterProducts.model";
import { ProductRepository } from "src/app/core/repositories/products.repository";
import { ProductModel } from "src/app/core/models/response/products.model";
import { ProductDetailByIdModel } from "src/app/core/models/response/productDetail.model";
import { CartModel } from "src/app/core/models/insite/cart.model";
import { InactivityRepository } from "src/app/core/repositories/inactivity.repository";
import { MatDialog } from "@angular/material/dialog";
import { DialogService } from "src/app/core/utils/dialog.service";
import { DialogParams } from "src/app/core/models/insite/dialogParams.model";
import { GtmDispatchEventsRepository } from "src/app/core/repositories/gtmDispatchEvent.repository";


@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"],
})
/**
 * Componente de la barra superior.
 *
 * Este componente se encarga de mostrar la barra superior de la aplicación y gestionar las interacciones del usuario en ella.
 */
export class TopbarComponent implements OnInit {
  selected: any;
  openMobileMenu: boolean;
  contentMenuProfileClass = "content-2";
  configData: any;
  user!: LoginValeproResponseModel;
  categories: CategoryModel[] = [];
  toggle = true;
  points: string = "0";
  textPoints: string = "Tus puntos";
  greet: string = "¡Hola!";
  person: any;
  personName: string;
  urlLogo: any;
  menuItem: GetQuickMenuModel = getSession<GetQuickMenuModel>('fastMenu');
  isMenuOpen = true;

  isMenuOpenAcount = true;
  isMenuOpenNotifi = true;
  @ViewChild("toggleButton") toggleButton: any;
  @ViewChild("toggleButtonAcount") toggleButtonAcount: any;
  @ViewChild("toggleButtonNotifi") toggleButtonNotifi: any;
  @ViewChild("menu") menu: any;
  @ViewChild("appDataSummary") appDataSummary: any;
  @ViewChild("appDataSummaryMobile") appDataSummaryMobile: any;
  filter: FilterProductsModel = {
    Mode: 2,
    CatalogueIds: [],
    ProductName: null,
    CategoryIds: [],
    PointsOrderType: null,
    MinimumPoints: null,
    MaximumPoints: null,
    Page: 1,
    PageSize: 12
  };
  itemsCart: number = 0;
  notifications: any[] = [];
  badgeNotification: number = 0;
  dataBalance: any;
  routes: any;
  menuOpen = false;
  menuOpenUser = false;
  menuOpenmovil = false;
  userData: PersonDataResponseModel = getSession<PersonDataResponseModel>('userData');
  @ViewChild('namebutton', { read: ElementRef, static: false }) namebutton!: ElementRef;

  textQuery: string = '';
  productList: ProductModel[];
  isProducts = false;
  listFiltered: ProductModel[];
  loadingProducts = false;
  @ViewChildren('dropdown1, dropdown2, dropdown3, dropdown4, dropdown5, dropdown6') dropdowns: QueryList<ElementRef>;
  private globalClickUnlistener: () => void;
  inactivityRepository: InactivityRepository = inject(InactivityRepository);
  isLogout: boolean = false;

  constructor(
    public dialog: MatDialog,
    private renderer: Renderer2,
    private router: Router,
    private dialogService: DialogService,
    private notificationService: NotificationService,
    private configUtil: ConfigUtil,
    private categoryRepository: CategoryRepository,
    private productRepository: ProductRepository,
    private gtmEventRepository: GtmDispatchEventsRepository,
  ) {
    this.openMobileMenu = false;
    this.configData = {
      suppressScrollX: true,
      wheelSpeed: 0.3,
    };
    this.categories = [];
    this.personName = "";

    let listProducts = getSession<ProductModel[]>('l-f-products');
    if (listProducts) {
      this.productList = listProducts;
    }
    this.getInactivityUser();
  }

  /**
   * Obtiene el usuario inactivo.
   *
   * Este método se utiliza para restablecer el temporizador de inactividad del usuario y realizar acciones adicionales en caso de que el usuario no haya cerrado sesión.
   *
   * @returns {void} No devuelve ningún valor.
   * @throws {Error} Si ocurre un error durante la suscripción al restablecimiento del temporizador.
   */
  getInactivityUser(): void {
    this.inactivityRepository.resetTimer().subscribe({
      next: (data: any) => {
        if (!this.isLogout) {
          let customEvent = new CustomEvent('closePopUp');
          document.dispatchEvent(customEvent);
          this.isLogout = true;
          let dialogParams: DialogParams = {
            success: false,
            confirmText: "Ok",
            msg: "Tu sesión ha expirado por inactividad. Por favor, vuelve a iniciar sesión.",
            page: undefined
          };
          this.dialogService.openCloseSessionDialog(dialogParams);
        }
        this.logout();
      },
      error: error => {
      }
    });
  }

  ngOnDestroy() {
    if (this.globalClickUnlistener) {
      this.globalClickUnlistener();
    }
  }

  /**
   * Obtiene los datos del usuario.

   */
  getUserData() {
    this.userData = getSession<PersonDataResponseModel>('userData');
  }

  /**
   * Navega a la página de cuenta de usuario.
   */
  goAccountUser() {
    this.router.navigate(["/main/account"]);
  }

  /**
   * Cambia el estado del menú.
   * @param none
   * @returns none
   */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuOpenAcount = true;
    this.isMenuOpenNotifi = true;
  }

  /**
 * Cambia el estado del menú móvil.
 *
 * @returns {void}
 */
  toggleMenuMovil() {
    this.menuOpenmovil = !this.menuOpenmovil;
    if (this.menuOpenmovil) {
      this.menuOpenUser = false;
      this.menuOpen = false;
    }
  }

  /**
   * Cambia el estado de la variable `menuOpen` y actualiza otras variables relacionadas.
   *
   * @returns {void}
   */
  toggleMenuCategories() {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.menuOpenmovil = false;
      this.menuOpenUser = false;
      this.isProducts = false;
    }
  }


  /**
   * Cambia el estado del menú de cuenta.
   *
   * @remarks
   * Este método se utiliza para alternar entre el estado abierto y cerrado del menú de cuenta.
   *
   * @param sendGtmDataUser - Indica si se debe enviar datos de GTM del usuario.
   */
  toggleMenuAcount() {
    this.sendGtmDataUser();
    this.isMenuOpenAcount = !this.isMenuOpenAcount;
    if (this.isMenuOpenAcount) {
      this.menuOpenmovil = false;
      this.menuOpen = false;
    }
    this.menuOpenUser = !this.menuOpenUser;
    this.isProducts = false;
  }


  /**
   * Cambia el estado del menú de notificaciones.
   *
   * @param none
   * @returns none
   */
  toggleMenuNotifi() {
    this.sendGtmDataNotifi();
    this.isMenuOpenNotifi = !this.isMenuOpenNotifi;
    this.isMenuOpen = true;
    this.isMenuOpenAcount = true;
  };

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  ngOnInit(): void {
    this.urlLogo = "main";
    this.getUser();
    this.getCategories();
    this.getForm();
    this.getMenu();

    document.addEventListener('numberOfCartItemsEvent', (event: any) => {
      this.itemsCart = event.detail;
    });
    const cart = getSession<CartModel[]>('wr-c-cart');
    if (cart) this.itemsCart = cart.length;

    document.addEventListener('userDataEvent', (event: any) => {
      this.getUserData()
    });

    this.globalClickUnlistener = this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));
  }

  /**
 * Navega a la página del carrito.
 *
 * Envía los datos de GTM relacionados con el carrito antes de la navegación.
 *
 * @param none
 * @returns none
 */
  goCart() {
    this.sendGtmDataCart();
    this.router.navigate(["/main/redeem/cart"]);
  }


  /**
   * Obtiene las notificaciones del usuario.
   *
   * @param accountId - El ID de la cuenta del usuario.
   */
  getNotifications(): void {
    this.notificationService.getNotifications(this.user.AccountId).subscribe((res: any) => {
      this.badgeNotification = 0;
      this.notifications = [];
      if (res.data) {
        res.data.forEach((notification: any) => {
          if (notification.stateId === 0) {
            this.notifications.push(notification);
            this.badgeNotification++;
          }
        });
      }
    });
  }

  /**
   * Actualiza las notificaciones.
   *
   * @param notification - La notificación a actualizar.
   */
  updateNotifications(notification: any): void {
    notification.stateId = 9;
    this.notificationService
      .updateNotifications(notification)
      .subscribe((res: any) => {
        this.getNotifications();
      });
  }
  
  /**
   * Deshabilita la insignia de notificación y redirige a la página correspondiente.
   *
   * @param notification - La notificación que se va a procesar.
   */
  disBadge(notification: any): void {
    let notificationId = parseInt(notification.page);
    let nameRoute: string;
    this.updateNotifications(notification);
    this.routes.forEach((route: any) => {
      switch (route.IDPagina) {
        case 424:
          nameRoute = "newsList";
          break;
        case 425:
          nameRoute = "catalog";
          break;
        case 426:
          nameRoute = "missions";
          break;
        case 427:
          nameRoute = "pay";
          break;
        case 428:
          nameRoute = "widgets";
          break;
        default:
          break;
      }
      if (notificationId === route.IDPagina) {
        if (notification.content) {
          this.router.navigate([
            `/main/${nameRoute}/detail/${notification.content}`,
          ]);
        } else if (notification.page) {
          this.router.navigate([`/main/${nameRoute}`]);
        } else {
          return;
        }
      }
    });
  }

  logout() {
    this.configUtil.logout();
  }


  /**
   * Activa o desactiva la barra lateral derecha.
   *
   * @param settingsButtonClicked - El evento que se emite cuando se hace clic en el botón de configuración.
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   *
   * @param event
   */
  toggleMobileMenu(event: any): void {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
 * Obtiene el usuario actual.
 *
 * @returns {void}
 */
  getUser() {
    this.user = getSession<LoginValeproResponseModel>('accountValepro');
    this.personName = this.user.Name;
  }

  /**
   * Obtiene las categorías.
   *
   * @returns {void}
   */
  getCategories() {
    this.categoryRepository.getCategories().subscribe({
      next: (resp: ResponseBaseModel<CategoryModel[]>) => {
        this.categories = resp.data;
        if (resp.data.length > 0) {
          const itemAll: CategoryModel = {
            CategoryId: 0,
            Name: 'Todos',
            IconName: 'star',
            ProgramId: resp.data[0].ProgramId
          }
          this.categories.unshift(itemAll)
        }
        saveSession(resp.data, 'l-f-categories');
      },
      error: (error) => {
        this.categories = [];
      }
    })
  }

  /**
   * Obtiene el formulario.
   *
   * @returns {void}
   */
  getForm() {
    let response = getSession<any>('formHeader');
    if (response != null) {
      this.textPoints = this.getgreetAndTextPoints(
        response.Propiedades,
        "puntos"
      );
      this.greet = this.getgreetAndTextPoints(
        response.Propiedades,
        "saludo"
      );
    }
  }

  /**
   * Obtiene el saludo o los puntos de texto correspondientes según el tipo especificado.
   *
   * @param properties - Las propiedades de texto.
   * @param type - El tipo de texto a obtener ("puntos" o "saludo").
   * @returns El texto correspondiente al tipo especificado.
   */
  getgreetAndTextPoints(properties: any, type: string) {
    for (let value of properties) {
      if (value.VariableValefiel == "lblPuntos" && type == "puntos") {
        return value.Label;
      }
      if (value.VariableValefiel == "lblSaludo" && type == "saludo") {
        return value.Label;
      }
    }
  }

  /**
   * Obtiene el menú.
   *
   * @returns El menú obtenido.
   */
  getMenu() {
    if (this.menuItem == null) {
      return;
    }
    let menu = this.menuItem.MenuItems.filter(x => x.Active);
    this.menuItem.MenuItems.splice(0, this.menuItem.MenuItems.length, ...menu)
  }

  /**
   * Selecciona una categoría y realiza las acciones correspondientes.
   *
   * @param category - La categoría seleccionada.
   */
  selectCategory(category: CategoryModel) {
    this.sendGtmDataCategory(category);
    let arrayCategory: number[] = [];
    if (category.CategoryId !== 0) {
      arrayCategory.push(category.CategoryId)
    }
    const updateAndDispatchFilter = (filterData: FilterProductsModel) => {
      filterData.CategoryIds = arrayCategory;
      saveSession(filterData, 'c-p-filter');
      const searchProducts = new CustomEvent('c-p-filterEvent', { detail: null });
      document.dispatchEvent(searchProducts);
    };

    let filterDataG = getSession<FilterProductsModel>('c-p-filter');
    if (filterDataG) {
      updateAndDispatchFilter(filterDataG);
    } else {
      updateAndDispatchFilter(this.filter);
    }
    this.router.navigate(['/main/catalog']);
  }

  /**
   * Maneja el evento de selección de un producto.
   *
   * @param product - El objeto del producto seleccionado.
   * @returns Nada.
   */
  onSelectProduct(product: ProductModel) {
    this.productRepository.getProductId(product.ProductId).subscribe({
      next: (resp: ResponseBaseModel<ProductDetailByIdModel>) => {
        saveSession(resp.data.Award, 'wr-c-product');
        this.isProducts = false;
        const onChange = new CustomEvent('on-change-product', { detail: null });
        document.dispatchEvent(onChange);
        this.router.navigate(["/main/catalog/detail"]);
        this.textQuery = '';
      },
      error: (error) => {
        this.isProducts = false;
      }
    })
  }



  /**
   * Método que se ejecuta cuando se produce un error al cargar una imagen.
   * @param item
   */
  onImageError(item: { ImagePath: string }) {
    item.ImagePath = '../../../../assets/img/imageNotavailable.png';
  }


  /**
   * Comprueba si un elemento está activo.
   *
   * @param item - El elemento a comprobar.
   * @returns `true` si el elemento está activo, de lo contrario `false`.
   */
  isActive(item: any) {
    return this.selected === item;
  }

  /**
   * Desencadena el evento de clic del menú.
   *
   * @param item - El objeto FastMenuItemModel seleccionado.
   * @returns Nada.
   */
  triggerMenuClick(item: FastMenuItemModel) {
    this.selected = item;
    this.sendGtmDataFiltroMenu(item);
    this.router.navigate([item.Path]);

  }

  // Remove the duplicate function implementation

  /**
 * Navega a la página principal y realiza acciones adicionales.
 *
 * @param namebutton - El elemento del botón de nombre.
 * @returns void
 */
  goMain() {
    this.router.navigate(["main"]);
    if (this.namebutton) {
      this.namebutton.nativeElement.classList.remove('active')
    }
    this.selected = false;
  }

  /**
   * Actualiza la lista de productos filtrados según el valor de búsqueda proporcionado.
   * @param searchValue El valor de búsqueda para filtrar los productos.
   */
  onProductNameChange(searchValue: string) {
    if (searchValue.length == 0) {
      this.isProducts = false;
      return
    }
    this.isProducts = true;
    this.menuOpen = false;
    this.listFiltered = this.productList.filter((product) => {
      return product.Name.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  /**
  * Realiza una búsqueda de productos.
  *
  * @param textQuery - El texto de búsqueda para los productos.
  * @returns void
  */
  onSearchProduct() {
    this.sendGtmDataSearch()
    this.loadingProducts = true;
    this.menuOpen = false;
    this.menuOpenUser = false;
    this.menuOpenmovil = false;
    setTimeout(() => {
      this.loadingProducts = false;
      this.onProductNameChange(this.textQuery)
    }, 1000);
  }


  /**
   * Envía datos a GTM.
   */
  sendGtmDataCategory(category: any) {
    let tagData: GTMSelectContent = {
      event: "Select_content",
      ParameterTarget: "Home",
      ParameterType: 'button',
      ParameterCategory: 'Home-Catalogo de Productos',
      IDAccount: this.user.AccountId,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      UserName: this.user.UserName,
      ParameterText: category.Name,
      ParameterItemID: ''
    };
    this.gtmEventRepository.sendEvent(tagData);
  }


  /**
   * Envía datos a GTM.
   */
  sendGtmDataSearch() {
    let tagData: GTMSelectContent = {
      event: "Select_content",
      ParameterTarget: "Home",
      ParameterType: 'button',
      ParameterCategory: 'Home- Catalogo de Productos',
      IDAccount: this.user.AccountId,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      UserName: this.user.UserName,
      ParameterText: "Buscador Productos",
      ParameterItemID: "",
    };
    this.gtmEventRepository.sendEvent(tagData);
  }


  /**
   * Envía datos a GTM.
   */
  sendGtmDataFiltroMenu(item: any) {
    let tagData: GTMSelectContent = {
      event: "Select_content",
      ParameterTarget: "Home",
      ParameterType: 'button',
      ParameterCategory: 'Home-Vale PRO',
      IDAccount: this.user.AccountId,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      UserName: this.user.UserName,
      ParameterText: item.Name,
      ParameterItemID: item.IDPagina
    }
    this.gtmEventRepository.sendEvent(tagData);
  }


  /**
   * Envía datos a GTM.
   */
  sendGtmDataNotifi() {
    let tagData: GTMSelectContent = {
      event: "Select_content",
      ParameterTarget: "Home",
      ParameterType: 'button',
      ParameterCategory: 'Home-Vale PRO',
      IDAccount: this.user.AccountId,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      UserName: this.user.UserName,
      ParameterText: 'Notificaciones',
      ParameterItemID: ''
    };
    this.gtmEventRepository.sendEvent(tagData);
  }

  /**
   * envia datos a GTM
   */
  sendGtmDataCart() {
    let tagData: GTMSelectContent = {
      event: "Select_content",
      ParameterTarget: "Home",
      ParameterType: 'button',
      ParameterCategory: 'Home-Vale PRO',
      IDAccount: this.user.AccountId,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      UserName: this.user.UserName,
      ParameterText: 'Carrodecompras',
      ParameterItemID: ''
    };
    this.gtmEventRepository.sendEvent(tagData);
  }

  /**
   * Envía datos a GTM.
   */
  sendGtmDataUser() {
    let tagData: GTMSelectContent = {
      event: "select_content",
      ParameterTarget: "Home",
      ParameterType: 'Botón',
      ParameterCategory: "Perfil de Usuario",
      UserName: this.user.UserName,
      IDAccount: this.user.AccountId,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      ParameterText: 'Ver menú Perfil de Usuario',
      ParameterItemID: '0'
    };
    this.gtmEventRepository.sendEvent(tagData);
  }

  /**
   *
   * @param event
   */
  onDocumentClick(event: MouseEvent): void {
    let clickedInside = false;
    this.dropdowns.forEach((dropdown: ElementRef, index: number) => {
      if (dropdown.nativeElement.contains(event.target)) {
        clickedInside = true;
      }
    });
    if (!clickedInside) {
      this.closeDropdows()
    }
  }

  /**
   * Método que se ejecuta cuando se enfoca en la entrada de texto.
   * Cierra todos los desplegables.
   */
  onInputFocus() {
    this.closeDropdows()
  }

  /**
   * Cierra todos los menús desplegables en la barra superior.
   *
   * @param none
   * @returns void
   */
  closeDropdows() {
    this.menuOpen = false;
    this.isProducts = false;
    this.menuOpenUser = false;
    this.menuOpenmovil = false;
    this.isMenuOpenAcount = false;
  }
}
