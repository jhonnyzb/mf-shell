import { Injectable } from "@angular/core";
import { CuentasDto } from "src/app/infrastructure/dto/valefiel/cuentas.dto";
import { getSession, saveSession } from "./encryptData";
import { MixedPaymentValueResponseDto } from "src/app/infrastructure/dto/valefiel/mixedPaymentValueResponse.dto";


@Injectable({
  providedIn: 'root'
})
export class CartUtil {
  account: CuentasDto = getSession<CuentasDto>('account');
  mostrarNota!: boolean;
  /**
   * Numero de elementos en el carrito.
   * @param cartItems
   */
  numberOfCartItemsEvent(cartItems: number) {
    const miEvento = new CustomEvent('numberOfCartItemsEvent', { detail: cartItems });
    document.dispatchEvent(miEvento);
  }

  /**
   * Comprueba el carrito.
   *
   * @returns El carrito actual.
   */
  checkCart() {
    let cart = this.getCart();
    this.cartEmitter(cart);
  }

  /**
   *
   * @param cart
   * @returns
   */
  getCountItems(cart: any[]) {
    let result = 0;
    for (let index = 0; index < cart.length; index++) {
      const element = cart[index];
      result += element.Amount;
    }
    return result;
  }

  /**
   *
   * @param cart
   */
  cartEmitter(cart: any) {
    let countItems = this.getCountItems(cart);
    this.numberOfCartItemsEvent(countItems);
  }

  /**
   *
   * @returns
   */
  getCart(): any[] {

    let cart: [] = [];
    let dataCart = null
    if (sessionStorage.getItem("cart")) {
      dataCart = getSession('cart');
    }

    if (dataCart != undefined && dataCart != null) {
      dataCart = getSession('cart');
      cart = dataCart;
    }
    return cart;
  }

  /**
   *
   * @param cart
   * @param product
   */
  updateProduct(cart: any[], product: any) {
    for (let index = 0; index < cart.length; index++) {
      const element = cart[index];
      if (element.ProductId == product.ProductId) {
        element.Amount = element.Amount + product.Amount;

        //si tiene parametros adicionales nuevos, se actualiza al producto
        if (product.Params != undefined && product.Params != "") {
          element.Params = product.Params;
        }
      }
    }
  }

  /**
   *
   * @param data
   * @param counter
   * @param params
   * @returns
   */
  addProduct(data: any, counter: any, params: any) {
    let cart = this.getCart();
    let product = this.mapProduct(data, counter, params);
    if (this.isProductIn(cart, product)) {
      //actualizar cantidad del producto en el carrito
      this.updateProduct(cart, product);
      this.saveCart(cart);
      return;
    }
    //agregar al carrito
    cart.push(product);
    this.saveCart(cart);
  }

  /**
   *
   * @param cart
   * @param product
   * @returns
   */
  isProductIn(cart: any[], product: any) {
    let result = false;
    for (let index = 0; index < cart.length; index++) {
      const element = cart[index];
      if (element.ProductId == product.ProductId) {
        result = true;
        break;
      }
    }
    return result;
  }

  /**
   *  Mapea el producto.
   * @param product
   * @param counter
   * @param params
   * @returns
   */
  mapProduct(product: any, counter: any, params: any) {
    return {
      ProductId: product.IDPremio,
      CategoryId: product.IDCategoria,
      CampaingId: product.IDCampana,
      CatalogId: product.IDCatalogo,
      Image: product.Imagen,
      Points: product.Puntos ? product.Puntos : product.PuntosXUnidad,
      PointName: product.NombrePunto,
      UUID: product.UUID,
      Name: product.Nombre,
      NameShort: product.NombreCorto,
      Description: product.Descripcion,
      MinimunAmount: product.CantidadMinARedimir,
      Amount: counter,
      ClassId: product.IDClasePremio,
      DeliveryType: product.TipoEntrega,
      Params: params,
      ParametrosRedimir: product.ParametrosRedimir,
      SolicitaConfirmacionDatos: product.SolicitaConfirmacionDatos
    };
  }


  /**
   * Guarda el carrito de compras.
   *
   * @param cart - El carrito de compras a guardar.
   *
   * @remarks
   * Este método guarda el carrito de compras en la sesión actual. Si el carrito cumple con ciertas condiciones, se emite un evento de carrito.
   * Si el carrito no cumple con las condiciones, se realizan ciertos cálculos y luego se guarda en la sesión actual, seguido de emitir el evento de carrito.
   */
  saveCart(cart: any) {
    if (cart && this.account.MostrarWelcomeKit && cart[0].Amount < 2) {
      saveSession(JSON.stringify(cart), 'cart');
      this.cartEmitter(cart);
    } else if (!this.account.MostrarWelcomeKit) {
      this.mixedPaymentValues(0, this.calculateTotalPoints());
      saveSession(JSON.stringify(cart), 'cart');
      this.cartEmitter(cart);
    }
  }

  /**
   * Calcula el total de puntos de la carrito.
   *
   * @returns El total de puntos de la carrito.
   */
  calculateTotalPoints() {
    let cart = this.getCart();
    let result = 0;
    for (let index = 0; index < cart.length; index++) {
      const element = cart[index];
      result += element.Amount * element.Points;
    }
    return result;
  }

  async mixedPaymentValues(ammountToPay: number, points: number) {
    let valuesMixedPayment: MixedPaymentValueResponseDto = {
      AmmountToPay: ammountToPay,
      Points: points
    };
    saveSession(JSON.stringify(valuesMixedPayment), 'm-p-v');
  }

  /**
   * Limpia los valores de pago mixto.
   */
  clearMixPaymentValues() {
    sessionStorage.removeItem("m-p-v");
  }

  /**
    * Establece el formulario de verificación.
   * @param verification
   */
  setVerificationForm(verification: boolean) {
    this.mostrarNota = verification;
  }
}
