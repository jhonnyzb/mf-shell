import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  /**
   * Convierte un objeto en una cadena de consulta de parámetros.
   * @param obj - El objeto que se va a convertir en parámetros.
   * @returns Una cadena de consulta de parámetros generada a partir del objeto.
   */
  objectToParams(obj: any) {
    let params = Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&');
    return params ? '?' + params : '';
  }

  /**
   * Realiza una búsqueda de productos.
   *
   * @event searchProducts$
   * @description Este evento se dispara cuando se realiza una búsqueda de productos.
   * @param {CustomEvent} searchProducts - El evento de búsqueda de productos.
   */
  searchProducts() {
    const searchProducts = new CustomEvent('searchProducts$');
    document.dispatchEvent(searchProducts);
  }

}
