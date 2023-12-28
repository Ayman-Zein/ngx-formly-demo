import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormalyComponent } from './formaly.component';

describe('FormalyComponent', () => {
  let component: FormalyComponent;
  let fixture: ComponentFixture<FormalyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormalyComponent]
    });
    fixture = TestBed.createComponent(FormalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
