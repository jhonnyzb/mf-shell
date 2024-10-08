import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { getSession } from '../utils/encryptData';
import { GetQuickMenuModel } from '../models/response/fastMenuListResponse.model';

/**
 * Función de guardia para el menú rápido.
 *
 * @param route - La ruta activada.
 * @param state - El estado actual de la aplicación.
 * @returns Devuelve un valor booleano que indica si se permite la activación de la ruta o no.
 */
export const FastMenuGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let menuItem: GetQuickMenuModel = getSession<GetQuickMenuModel>('fastMenu');
  if (menuItem) {
    let menu = menuItem.MenuItems.filter(menuItem => state.url.includes(menuItem.Path))[0];
    if (menu && menu.Active) {
      return true;
    } else {
      router.navigate(['/main']);
      return false;
    }
  } else {
    router.navigate(['/main']);
    return false;
  }
};
