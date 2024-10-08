import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DialogParamsAward } from "src/app/core/models/dialogParams.model";
import { GTMSelectContent } from "src/app/core/models/gtm-models/gtmSelectContent.model";
import { CartModel } from "src/app/core/models/insite/cart.model";
import { FeatureProductsModelResponse } from "src/app/core/models/response/featureProducts.model";
import { ProductDetailByIdModel, ProductDetailModel } from "src/app/core/models/response/productDetail.model";
import { ResponseBaseModel } from "src/app/core/models/response/responseBase.model";
import { CatalogRepository } from "src/app/core/repositories/catalog.repository";
import { GtmDispatchEventsRepository } from "src/app/core/repositories/gtmDispatchEvent.repository";
import { DialogService } from "src/app/core/utils/dialog.service";
import { getSession, saveSession } from "src/app/core/utils/encryptData";
import { LoginValeproResponseModel } from "src/app/infrastructure/dto/response/loginValeproResponse.model";

@Component({
  selector: "app-feature-articles",
  templateUrl: "./feature-articles.component.html",
  styleUrls: ["./feature-articles.component.scss"],
})

/**
 * Componente para mostrar artículos destacados.
 */
export class FeatureArticlesComponent {
  config = {
    swipe: true,
    variableWidth: true,
    firstMobile: true,
    slidesToScroll: 3,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000
  };

  slides: FeatureProductsModelResponse[] = [];
  user = getSession<LoginValeproResponseModel>('accountValepro');


  constructor(private catalogRepository: CatalogRepository, private router: Router, private dialogService: DialogService, private gtmEventRepository: GtmDispatchEventsRepository,
  ) { }

  ngOnInit() {
    this.getFeatureProducts();
  }

  /**
   * Obtiene los productos destacados.
   */
  getFeatureProducts() {
    this.catalogRepository.getFeatureProducts().subscribe({
      next: (resp: ResponseBaseModel<FeatureProductsModelResponse[]>) => {
        this.slides = resp.data;
      },
      error: (error) => {
        this.slides = [];
      }
    })
  }

  /**
   * Maneja el evento de error de imagen.
   *
   * @param item - El objeto que contiene la URL de la imagen.
   */
  onImageError(item: { ImageUrl: string }) {
    item.ImageUrl = '../../../../assets/img/imageCatalog.png';
  }

  /**
   * Navega a la página de detalle del producto.
   *
   * @param productId - El ID del producto al que se desea navegar.
   */
  goToDetail(productId: number) {
    this.catalogRepository.getProductId(productId).subscribe({
      next: (resp: ResponseBaseModel<ProductDetailByIdModel>) => {
        saveSession(resp.data.Award, 'wr-c-product');
        this.router.navigate(["/main/catalog/detail"]);
        const onChange = new CustomEvent('on-change-product', { detail: null });
        document.dispatchEvent(onChange);
      },
      error: (error) => { }
    })
  }

  /**
   * Maneja el evento de clic en el carrito.
   *
   * @param productId - El ID del producto seleccionado.
   */
  onClikcCart(productId: number) {
    this.catalogRepository.getProductId(productId).subscribe({
      next: (resp: ResponseBaseModel<ProductDetailByIdModel>) => {
        saveSession(resp.data.Award, 'wr-c-product');
        this.onDialogProduct(resp.data.Award)
      },
      error: (error) => { }
    })

  }

  /**
   * Abre un diálogo de producto y realiza acciones dependiendo de la clase del producto.
   *
   * @param product - El objeto del producto seleccionado.
   * @returns Nada.
   */
  onDialogProduct(product: ProductDetailModel) {
    const typesProductsPopups = [1, 2, 6];
    if (product.ProductClass === 4) {
      this.onAddCart(product);
      return;
    }
    if (product.ProductClass === 3) {
      saveSession(product, 'wr-c-product');
      this.router.navigate(["/main/catalog/detail"]);
      return;
    }
    if (typesProductsPopups.includes(product.ProductClass)) {
      let dialogParams: DialogParamsAward = {
        Msg: null,
        Page: null,
        TypeAward: product.ProductClass
      };
      this.dialogService.openConfirmDialogProduct(product.ProductClassAuxiliaryMessage, dialogParams)
        .afterClosed().subscribe((resp) => {
          if (resp.flag) {
            this.onAddCart(product, resp.phoneId);
          }
        })
    }
  }

  /**
   * Agrega un producto al carrito de compras.
   *
   * @param product - El objeto del producto que se va a agregar al carrito.
   * @param phoneId - (Opcional) El ID del teléfono del operador asociado al producto.
   */
  onAddCart(product: ProductDetailModel, phoneId = null) {
    let cart = getSession<CartModel[]>('wr-c-cart') || [];
    let index = cart.findIndex(p => p.AwardId == product.AwardId);
    if (index !== -1) {
      cart[index].Quantity = cart[index].Quantity + 1;
      cart[index].OperatorPhoneId = product.ProductClass === 6 ? phoneId : null;
      saveSession(cart, 'wr-c-cart');
    } else {
      const selectProductSave: CartModel = {
        AwardId: product.AwardId,
        LongName: product.LongName,
        ShortName: product.ShortName,
        Description: product.Description,
        Cost: product.Cost,
        Points: product.Points,
        Observations: product.Observations,
        ProductClass: product.ProductClass,
        Quantity: 1,
        OperatorPhoneId: phoneId,
        ImagePath: product.AwardImages[0] ? product.AwardImages[0].ImagePath : ''
      }
      cart.push(selectProductSave);
      saveSession(cart, 'wr-c-cart')
    }
    let q = 0;
    cart.forEach((product) => {
      q = q + product.Quantity
    })
    this.onEventCart(q);
  }

  /**
   * Maneja el evento de agregar al carrito.
   *
   * @param quantity - La cantidad de elementos a agregar al carrito.
   */
  onEventCart(quantity: number) {
    const quantityCart = new CustomEvent('numberOfCartItemsEvent', { detail: quantity });
    document.dispatchEvent(quantityCart);

    const onChange = new CustomEvent('on-change-product-confirm', { detail: null });
    document.dispatchEvent(onChange);
    this.router.navigate(["/main/catalog/cart-confirm"]);
  }

  /**
   * Redirige al catálogo principal.
   *
   * Envía los datos de GTM relacionados con el catálogo y navega hacia la ruta "/main/catalog".
   *
   * @param none
   * @returns void
   */
  redirectCatalog(): void {
    this.sendGtmDataCatalog();
    this.router.navigate(["/main/catalog"]);
  }

  /**
   * Envía datos de GTM al catálogo.
   *
   * @param {GTMSelectContent} tagData - Los datos del evento GTM.
   * @returns {void}
   */
  sendGtmDataCatalog() {
    let tagData: GTMSelectContent = {
      event: "Select_content",
      ParameterTarget: "Home",
      ParameterType: 'button',
      ParameterCategory: 'Home-Vale PRO',
      IDAccount: this.user.AccountId,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      UserName: this.user.UserName,
      ParameterText: 'Ver Catalogo',
      ParameterItemID: ''
    }
    this.gtmEventRepository.sendEvent(tagData);
  }
}
