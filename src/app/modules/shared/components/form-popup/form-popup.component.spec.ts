import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPopupComponent } from './form-popup.component';

describe('FormPopupComponent', () => {
  let component: FormPopupComponent;
  let fixture: ComponentFixture<FormPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPopupComponent]
    });
    fixture = TestBed.createComponent(FormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
