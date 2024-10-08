import { Injectable } from "@angular/core";
import { CuentasDto } from "src/app/infrastructure/dto/valefiel/cuentas.dto";



@Injectable({
  providedIn: 'root'
})
export class UserUtils {

  accountData!: CuentasDto;

  /**
   * Emite un evento personalizado 'accountEvent' con los detalles de la cuenta.
   *
   * @param account - Los detalles de la cuenta a enviar en el evento.
   */
  emitAccount(account: CuentasDto) {
    const miEvento = new CustomEvent('accountEvent', { detail: account });
    document.dispatchEvent(miEvento);
  }
}
