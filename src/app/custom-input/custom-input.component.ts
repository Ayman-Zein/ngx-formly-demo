import { Component, Input } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-input',
  template: `
    <div class="form-group">
      <label class="mb-2">{{ props.label }}</label>
      <input
        [formControl]="formControl"
        [placeholder]="props.placeholder"
        [class.is-invalid]="showError"
      />
      <div *ngIf="showError" class="invalid-feedback">{{ errorMessage }}</div>
    </div>
  `,
  styles: [
    `
      input {
        padding: 6px 8px;
        border: 1px solid blue;
        border-radius: 4px;
        width: 100%;
        box-sizing: border-box;
      }
      input.is-invalid {
        border: 1px solid red;
      }
      .invalid-feedback {
        color: red;
        margin-top: 4px;
        font-size: 12px;
      }
    `,
  ],
})
export class CustomInputComponent extends FieldType<FieldTypeConfig> {
  get errorMessage() {
    const errors = this.formControl.errors;
    if (errors) {
      const errorKey = Object.keys(errors)[0];
      return this.props['errorMessages'] &&
        this.props['errorMessages'][errorKey]
        ? this.props['errorMessages'][errorKey]
        : `Invalid ${this.props.label || 'value'}`;
    }
    return '';
  }
}
/**
 * FormlyModule.forRoot({
      types: [
        { name: 'input', component: InputFieldType },
      ],
    }),
    or inside components
 */
