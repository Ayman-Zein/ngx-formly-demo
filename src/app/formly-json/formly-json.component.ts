import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormConfigService } from '../data/form-config.service';

@Component({
  selector: 'app-dynamic-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <formly-form
        [form]="form"
        [fields]="fields"
        [model]="model"
      ></formly-form>
      <button class="btn btn-primary " type="submit">Submit</button>
    </form>
  `,
})
export class FormlyJsonComponent implements OnInit {
  form = new FormGroup({});
  model = {};
  fields!: FormlyFieldConfig[];

  constructor(private formConfigService: FormConfigService) {}

  ngOnInit() {
    this.formConfigService.getFormConfig().subscribe((fields) => {
      this.fields = fields;
    });
  }

  submit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.model);
    } else {
      console.log('Form is invalid');
    }
  }
}
