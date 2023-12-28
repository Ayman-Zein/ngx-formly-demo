import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  getContries() {
    return of([
      {
        value: null,
        label: '---',
      },
      {
        label: 'Egypt',
        value: 1,
      },
      {
        label: 'Suadia Arabia',
        value: 2,
      },
    ]);
  }

  getCities(countryId = null) {
    return of(
      [
        {
          value: null,
          label: '---',
          countryId: null,
        },
        {
          label: 'Cairo',
          value: 1,
          countryId: 1,
        },
        {
          label: 'Alexandria',
          value: 2,
          countryId: 1,
        },
        {
          label: 'Riyudah',
          value: 3,
          countryId: 2,
        },
      ].filter((city) => {
        if (countryId) {
          return city.countryId === countryId;
        } else {
          return true;
        }
      })
    );
  }
}
