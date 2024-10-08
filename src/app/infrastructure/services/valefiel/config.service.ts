import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ConfigService {

  constructor(
  ) {
  }


  /**
   * Convierte un objeto en una cadena de consulta de parámetros.
   * @param obj - El objeto que se va a convertir en parámetros.
   * @returns Una cadena de consulta de parámetros generada a partir del objeto.
   */
  objectToParams(obj: any) {
    let params = Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&');
    return params ? '?' + params : '';
  }
}
