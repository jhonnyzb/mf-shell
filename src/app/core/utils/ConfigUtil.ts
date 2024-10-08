import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { saveSession } from "./encryptData";


@Injectable({
  providedIn: 'root'
})
export class ConfigUtil {
  defaultProgram = 6;
  userToken!: string | null;
  constructor(
    private router: Router,
    private http: HttpClient) { }

  /**
   * Emite un evento de cambio de URL.
   */
  urlChangeEmit() {
    const miEvento = new CustomEvent('urlChangeEmit');
    document.dispatchEvent(miEvento);
  }

  /**
   * Emite un evento de cambio de contenido.
   */
  contentChangeEmit() {
    const miEvento = new CustomEvent('contentChangeEmit');
    document.dispatchEvent(miEvento);
  }


  /**
   * Establece la URL y el nombre en la sesión y emite un evento de cambio de URL.
   * @param url La URL a guardar en la sesión.
   * @param name El nombre a guardar en la sesión.
   */
  setUrl(url: string, name: string) {
    saveSession(JSON.stringify({ url: url, name: name }), 'urlSaved')
    this.urlChangeEmit();
  }

  /**
   * Cierra la sesión del usuario.
   *
   * @description Esta función se utiliza para cerrar la sesión del usuario actual.
   * Elimina el token de usuario, limpia los datos almacenados en el sessionStorage
   * y redirige al usuario a la página de inicio de sesión.
   *
   * @param router - El enrutador utilizado para redirigir al usuario a la página de inicio de sesión.
   */
  logout() {
    this.userToken = null;
    localStorage.setItem('env', sessionStorage.getItem('env'))
    localStorage.setItem('programId', sessionStorage.getItem('programId'))
    localStorage.setItem('program', sessionStorage.getItem('program'))
    localStorage.setItem('RegisterOnWebResponsive', sessionStorage.getItem('RegisterOnWebResponsive'))
    localStorage.setItem('configVisual', sessionStorage.getItem('configVisual'))
    localStorage.setItem('passwordMinlength', sessionStorage.getItem('passwordMinlength'))
    sessionStorage.clear();
    sessionStorage.setItem('env', localStorage.getItem('env'));
    sessionStorage.setItem('program', localStorage.getItem('program'));
    sessionStorage.setItem('programId', localStorage.getItem('programId'));
    sessionStorage.setItem('RegisterOnWebResponsive', localStorage.getItem('RegisterOnWebResponsive'));
    sessionStorage.setItem('configVisual', localStorage.getItem('configVisual'));
    sessionStorage.setItem('passwordMinlength', localStorage.getItem('passwordMinlength'));
    localStorage.removeItem('env');
    localStorage.removeItem('program');
    localStorage.removeItem('programId');
    this.router.navigate(['/login']);
  }
}
