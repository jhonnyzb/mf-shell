import { Component } from "@angular/core";

@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.scss"],
})
/**
 *  Componente principal de la aplicación.
 */
export class PagesComponent {
  opened: boolean;

  isLoading: boolean = false;
  user: any = {};
  account: any = {};

  constructor() {
    this.opened = false;
  }

  /**
   * Obtiene los recursos del mensaje.
   *
   * @param void - No recibe parámetros.
   * @returns void - No devuelve ningún valor.
   */
  getMessageResources(): void {
    this.isLoading = true;
  }

  isCondensed = false;

  /**
   * Comprueba si el dispositivo es un dispositivo móvil.
   * @returns {boolean} Verdadero si el dispositivo es un dispositivo móvil, falso de lo contrario.
   */
  isMobile() {
    const ua = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
      ua
    );
  }

  /**
   * Activa o desactiva la clase CSS "right-bar-enabled" en el elemento body del documento.
   *
   * @param {void}
   * @returns {void}
   */
  onSettingsButtonClicked() {
    document.body.classList.toggle("right-bar-enabled");
  }

  /**
   * Cambia el estado del menú móvil.
   *
   * @remarks
   * Esta función alterna el estado del menú móvil. Si el menú está expandido, lo contrae y viceversa.
   * También realiza cambios en las clases del elemento body del documento para reflejar el estado del menú.
   * Si el ancho de la pantalla es menor o igual a 768 píxeles, se asegura de que el menú no esté contraído verticalmente.
   */
  onToggleMobileMenu() {
    this.isCondensed = !this.isCondensed;
    document.body.classList.toggle("sidebar-enable");
    document.body.classList.toggle("vertical-collpsed");

    if (window.screen.width <= 768) {
      document.body.classList.remove("vertical-collpsed");
    }
  }
}
