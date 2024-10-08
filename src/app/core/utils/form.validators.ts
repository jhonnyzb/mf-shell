import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
/**
 * Clase que contiene validadores personalizados para formularios.
 */
export class FormValidators {

  private fields: any;

  constructor(fields: any) {
    this.fields = fields;
  }

  /**
   * Valida una expresión en un grupo de controles.
   *
   * @param group - El grupo de controles a validar.
   * @returns Un objeto de errores de validación si la expresión no se cumple, de lo contrario, null.
   */
  validateExpression: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.parent?.get(this.fields[1])?.value;
    const regx = this.fields[0];
    return regx.test(pass) ? null : { required: true }
  }
}
