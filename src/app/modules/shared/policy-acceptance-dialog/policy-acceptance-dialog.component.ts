import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, interval, takeUntil, takeWhile } from 'rxjs';
import { PolicyAcceptanceRequestModel } from 'src/app/core/models/request/policyRequest.model';
import { FooterResponseModel } from 'src/app/core/models/response/footerResponse.model';
import { PolicyRepository } from 'src/app/core/repositories/policy.repository';
import { getSession, saveSession } from 'src/app/core/utils/encryptData';
import { LoginValeproResponseModel } from 'src/app/infrastructure/dto/response/loginValeproResponse.model';

@Component({
  selector: 'app-policy-acceptance-dialog',
  templateUrl: './policy-acceptance-dialog.component.html',
  styleUrls: ['./policy-acceptance-dialog.component.scss']
})
/**
 * Componente para el diálogo de aceptación de políticas.
 */
export class PolicyAcceptanceDialogComponent {
  policyAcceptance: PolicyAcceptanceRequestModel = { AcceptTermsAndConditions: false, AcceptHabeasData: false };
  private destroy$ = new Subject<void>();
  tycData: FooterResponseModel = null;
  urlterms: string = '';
  urlPolicy: string = '';
  isLoadInfo = false;

  constructor(
    public dialogRef: MatDialogRef<PolicyAcceptanceDialogComponent>,
    private policyRepository: PolicyRepository,
  ) {
  }

  ngOnInit() {
    this.waitForTycData();
  }

  /**
   * Espera a que se carguen los datos de los términos y condiciones.
   */
  waitForTycData() {
    interval(100)
      .pipe(
        takeWhile(() => !this.tycData),
        takeUntil(this.destroy$))
      .subscribe(() => {
        this.tycData = getSession<FooterResponseModel>('formFooter');
        this.urlterms = this.tycData?.FooterPrograms.TermsAndConditions ?? '';
        this.urlPolicy = this.tycData?.FooterPrograms.DataProcessingPolicy ?? '';
        this.isLoadInfo = true;
        // Detener la suscripción después del primer éxito
        this.destroy$.next();
        this.destroy$.complete();
      });
  }

  /**
   * Actualiza la aceptación de las políticas.
   *
   * @returns {void}
   * @param {void}
   * @throws {any} Si ocurre un error durante la actualización de la aceptación de las políticas.
   */
  acceptPolicies(): void {
    this.policyRepository.updatePolicyAcceptance(this.policyAcceptance).subscribe({
      next: (response) => {
        let sesionData = getSession<LoginValeproResponseModel>('accountValepro');
        sesionData.AcceptHabeasData = true;
        sesionData.AcceptTermsAndConditions = true;
        saveSession(sesionData, 'accountValepro')
        this.dialogRef.close();
      },
      error: (err) => {
      }
    });
  }

  /**
   * Método de ciclo de vida ngOnDestroy.
   * Este método se llama justo antes de que se destruya el componente.
   * Se utiliza para realizar tareas de limpieza, como cancelar suscripciones o liberar recursos.
   * @param none
   * @returns void
   */
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
