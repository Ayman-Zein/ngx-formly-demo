import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from '../data/data.service';
import { startWith, switchMap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-formaly',
  templateUrl: './formaly.component.html',
  styleUrls: ['./formaly.component.scss'],
})
export class FormalyComponent {
  constructor(
    private dataService: DataService,
    private translate: TranslateService
  ) {}

  //The form instance which allow to track model value and validation status.
  form = new FormGroup({});
  //The model to be represented by the form.
  model = {
    id: 12345,
    email: 'email@gmail.com',
    age: 30,
    countryId: 2,
    cityId: 3,
    agree: false,
    comment: '',
    ip: null,
    firstName: '',
  };
  //The field configurations for building the form.
  fields: FormlyFieldConfig[] = [
    {
      key: 'email', //The key that relates to the model. This will link the field value to the model.
      type: 'input',
      // has lifecycle hooks like ones in angular (for customize your angular form)
      // hooks: {
      //   // you can access model + form + formControl , ... here
      //   onInit: (field: FormlyFieldConfig) => {
      //     if (field.props?.label) {
      //       field.props.label = 'Email address';
      //     }
      //   },
      // },
      props: {
        label: 'Email',
        placeholder: 'Enter email',
        required: true,
        attributes: {
          'data-cy': 'email',
        },
      },
      expressions: { 'props.label': this.translate.stream('Email') },
      validators: {
        email: {
          expression: (c: any) =>
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(c.value),
          message: (error: any, field: FormlyFieldConfig) =>
            `"${field.formControl?.value}" is not a valid email address`,
        },
      },
    },
    {
      key: 'age',
      type: 'input',
      props: {
        type: 'number',
        label: 'Age',
        placeholder: 'Enter age',
        required: true,
        min: 12,
        max: 40,
      },
      // overide predefine validators here (override global ones)
      validation: {
        messages: { max: 'please provid value less than 40' },
      },
      expressions: { 'props.label': this.translate.stream('Age') },
    },
    {
      key: 'countryId',
      type: 'select',

      props: {
        label: 'select country',
        options: this.dataService.getContries(),
      },
    },
    {
      key: 'cityId',
      type: 'select',

      props: {
        label: 'select city',
        options: [],
      },
      hooks: {
        onInit: (field: FormlyFieldConfig) => {
          if (field.props) {
            const countryIdControl = field.form?.get('countryId');

            if (countryIdControl) {
              field.props.options = countryIdControl.valueChanges.pipe(
                // to be not empty in initialization
                startWith(this.model.countryId),
                switchMap((countryId) => this.dataService.getCities(countryId))
              );
            }
          }
        },
      },
      //Expressions allow you to dynamically change field properties
      expressions: {
        'props.disabled': (field: FormlyFieldConfig) => !field.model.countryId, // using fn
        'model.cityId': '!model.countryId ? null : model.cityId', // using template expression
      },
    },
    {
      key: 'agree',
      type: 'checkbox',
      props: {
        label: 'I agree to leave comment',
      },
    },
    {
      key: 'comment',
      type: 'input',
      props: {
        label: 'coment',
        placeholder: 'Enter your comment',
      },
      expressions: {
        hide: '!model.agree',
      },
    },
    {
      key: 'ip',
      type: 'input',
      props: {
        label: 'Ip Adress',
        placeholder: 'Enter your ip address',
        required: true,
      },
      // custom validator
      validators: {
        validation: ['ip'],
      },
    },
    //Custom Input Component
    {
      key: 'firstName',
      type: 'customInput',
      props: {
        label: 'First Name',
        placeholder: 'Enter your first name',
        required: true,
        // errorMessages: {
        //   required: 'This field is required',
        // },
      },
    },
    // hidden fields
    {
      key: 'id',
    },
  ];

  onSubmit(form: any) {
    console.log(form);
  }
}
