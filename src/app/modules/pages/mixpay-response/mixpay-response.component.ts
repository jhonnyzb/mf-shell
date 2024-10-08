import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mixpay-response',
  templateUrl: './mixpay-response.component.html',
  styleUrls: ['./mixpay-response.component.scss']
})

/**
 * Componente para mostrar la respuesta de una transacción de Mixpay.
 */
export class MixpayResponseComponent {

  transactionDetails = [];
  transactionStatus: string;
  iconTransaction: string = 'assets/img/info-confirm.svg';
  methodType: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.getPaymentMethods(params['polPaymentMethodType'])
      this.transactionDetails = this.mapTransactionDetails(params);
      this.transactionStatus = this.getTransactionStatus(params['transactionState']);
    });
  }

  /**
   *
   * @param params
   * @returns
   */
  mapTransactionDetails(params: any): any[] {
    return [
      { item: 'Referencia de pago', detail: params.referenceCode },
      { item: 'Total pagado', detail: '$' + params.TX_VALUE },
      { item: 'Banco', detail: params.lapPaymentMethod == 'PSE' ? params.pseBank : params.lapPaymentMethod },
      { item: 'Autorización/CUS', detail: params.cus },
      { item: 'Fecha de transacción', detail: params.processingDate },
      { item: 'Recibo', detail: params.reference_pol },
      { item: 'Código de respuesta', detail: params.transactionState },
      { item: 'Método de pago', detail: this.methodType }
    ];
  }

  /**
   * Obtiene el tipo de método de pago basado en el código proporcionado.
   *
   * @param code El código del método de pago.
   * @returns El tipo de método de pago correspondiente al código proporcionado.
   */
  getPaymentMethods(code: string) {
    switch (code) {
      case '2':
        this.methodType = 'Tarjetas de Crédito';
        break;
      case '4':
        this.methodType = 'Transferencias bancarias PSE';
        break;
      case '5':
        this.methodType = 'Débitos ACH';
        break;
      case '6':
        this.methodType = 'Tarjetas débito';
        break;
      case '7':
        this.methodType = 'Efectivo';
        break;
      case '8':
        this.methodType = 'Referencia de pago';
        break;
      case '10':
        this.methodType = 'Pago en bancos';
        break;
      case '14':
        this.methodType = '	Transferencias bancarias SPEI';
        break;
    }
  }

  /**
   * Obtiene el estado de la transacción basado en el código de respuesta.
   *
   * @param responseCode El código de respuesta de la transacción.
   * @returns El estado de la transacción.
   */
  getTransactionStatus(responseCode: string): string {
    switch (responseCode) {
      case '4':
        this.iconTransaction = 'assets/img/check-circle.svg';
        return 'Transacción aprobada';
      case '6':
        this.iconTransaction = 'assets/img/Icon-material-error.svg';
        return 'Transacción rechazada';
      case '7':
        return 'Transacción pendiente';
      case '104':
        return 'Transacción fallida';
      default:
        return 'Estado desconocido';
    }
  }
}
