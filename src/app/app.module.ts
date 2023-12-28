import { NgModule, Renderer2 } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// for formaly
import {
  AbstractControl,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormalyComponent } from './formaly/formaly.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { TranslationService } from './translation.service';

// validation (custom validation msgs)
export function minValidatiomMsg(err: any, field: FormlyFieldConfig) {
  console.log(err, field);
  return `for ${field.props?.label} field please provide value greater than ${err.min} as you enter ${err.actual}`;
}
// custom validator
export function IpValidator(control: AbstractControl): ValidationErrors | null {
  return /(\d{1,3}\.){3}\d{1,3}/.test(control.value) ? null : { ip: true };
}

// Create a loader for translations
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent, FormalyComponent, CustomInputComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AppRoutingModule,
    // formly modules
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [{ name: 'customInput', component: CustomInputComponent }],
      validators: [{ name: 'ip', validation: IpValidator }],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'min', message: minValidatiomMsg },
        { name: 'ip', message: 'This is not a valid ip address' },
      ],
    }),
    FormlyBootstrapModule,
  ],
  providers: [TranslationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
