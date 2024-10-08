import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixpayResponseComponent } from './mixpay-response.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MixpayResponseComponent', () => {
  let component: MixpayResponseComponent;
  let fixture: ComponentFixture<MixpayResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MixpayResponseComponent],
      imports: [RouterTestingModule]
    });
    fixture = TestBed.createComponent(MixpayResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should map transaction details correctly when lapPaymentMethod is PSE', () => {
    const params = {
      referenceCode: '12345',
      TX_VALUE: '1000',
      lapPaymentMethod: 'PSE',
      pseBank: 'Some Bank',
      cus: '67890',
      processingDate: '2024-08-23',
      reference_pol: '123456',
      transactionState: '4'
    };

    component.methodType = 'Tarjetas de Crédito';
    const result = component.mapTransactionDetails(params);

    expect(result).toEqual([
      { item: 'Referencia de pago', detail: '12345' },
      { item: 'Total pagado', detail: '$1000' },
      { item: 'Banco', detail: 'Some Bank' },
      { item: 'Autorización/CUS', detail: '67890' },
      { item: 'Fecha de transacción', detail: '2024-08-23' },
      { item: 'Recibo', detail: '123456' },
      { item: 'Código de respuesta', detail: '4' },
      { item: 'Método de pago', detail: 'Tarjetas de Crédito' }
    ]);
  });

  it('should map transaction details correctly when lapPaymentMethod is not PSE', () => {
    const params = {
      referenceCode: '54321',
      TX_VALUE: '2000',
      lapPaymentMethod: 'OtherMethod',
      cus: '09876',
      processingDate: '2024-08-22',
      reference_pol: '654321',
      transactionState: '6'
    };

    component.methodType = 'Transferencias bancarias PSE';
    const result = component.mapTransactionDetails(params);

    expect(result).toEqual([
      { item: 'Referencia de pago', detail: '54321' },
      { item: 'Total pagado', detail: '$2000' },
      { item: 'Banco', detail: 'OtherMethod' },
      { item: 'Autorización/CUS', detail: '09876' },
      { item: 'Fecha de transacción', detail: '2024-08-22' },
      { item: 'Recibo', detail: '654321' },
      { item: 'Código de respuesta', detail: '6' },
      { item: 'Método de pago', detail: 'Transferencias bancarias PSE' }
    ]);
  });

  it('should set methodType to "Tarjetas de Crédito" for code 2', () => {
    component.getPaymentMethods('2');
    expect(component.methodType).toBe('Tarjetas de Crédito');
  });

  it('should set methodType to "Transferencias bancarias PSE" for code 4', () => {
    component.getPaymentMethods('4');
    expect(component.methodType).toBe('Transferencias bancarias PSE');
  });

  it('should set methodType to "Pago en bancos" for code 10', () => {
    component.getPaymentMethods('10');
    expect(component.methodType).toBe('Pago en bancos');
  });

  it('should not set methodType for an unknown code', () => {
    component.getPaymentMethods('unknown');
    expect(component.methodType).toBe('');
  });


  it('should return "Transacción aprobada" and set icon to "check-circle" for code 4', () => {
    const result = component.getTransactionStatus('4');
    expect(result).toBe('Transacción aprobada');
    expect(component.iconTransaction).toBe('assets/img/check-circle.svg');
  });

  it('should return "Transacción rechazada" and set icon to "Icon-material-error" for code 6', () => {
    const result = component.getTransactionStatus('6');
    expect(result).toBe('Transacción rechazada');
    expect(component.iconTransaction).toBe('assets/img/Icon-material-error.svg');
  });

  it('should return "Transacción pendiente" for code 7', () => {
    const result = component.getTransactionStatus('7');
    expect(result).toBe('Transacción pendiente');
  });

  it('should return "Transacción fallida" for code 104', () => {
    const result = component.getTransactionStatus('104');
    expect(result).toBe('Transacción fallida');
  });

  it('should return "Estado desconocido" for unknown code', () => {
    const result = component.getTransactionStatus('unknown');
    expect(result).toBe('Estado desconocido');
  });
});
