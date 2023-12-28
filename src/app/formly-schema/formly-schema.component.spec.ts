import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlySchemaComponent } from './formly-schema.component';

describe('FormlySchemaComponent', () => {
  let component: FormlySchemaComponent;
  let fixture: ComponentFixture<FormlySchemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlySchemaComponent]
    });
    fixture = TestBed.createComponent(FormlySchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
