import * as CryptoJS from "crypto-js";
const ENCRIPTKEY = "V4l3pr0US3r"

/**
 * Guarda los datos encriptados en la sesión del navegador.
 * @param data Los datos a encriptar.
 * @param key La clave de encriptación.
 */
export const saveSession = (data: any, key: string) => {
  let encripted = CryptoJS.AES.encrypt(JSON.stringify(data), ENCRIPTKEY + key).toString();
  sessionStorage.setItem(key, encripted)
}

/**
 * Obtiene el valor almacenado en sessionStorage y lo descifra.
 *
 * @template T - El tipo de dato esperado para el valor almacenado.
 * @param {string} key - La clave utilizada para almacenar el valor en sessionStorage.
 * @returns {T | null} - El valor descifrado almacenado en sessionStorage, o null si ocurre un error.
 */
export const getSession = <T>(key: string): T => {
  try {
    let data = sessionStorage.getItem(key);
    const valueDescrypt = CryptoJS.AES.decrypt(data, ENCRIPTKEY + key).toString(CryptoJS.enc.Utf8);
    if (!valueDescrypt) {
      throw new Error('Error al descifrar el valor almacenado en sessionStorage');
    }
    return JSON.parse(valueDescrypt) as T
  } catch (e) {
    return null;
  }
}
