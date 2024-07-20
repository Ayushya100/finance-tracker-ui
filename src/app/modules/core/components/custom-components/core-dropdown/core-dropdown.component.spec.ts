import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreDropdownComponent } from './core-dropdown.component';

describe('CoreDropdownComponent', () => {
  let component: CoreDropdownComponent;
  let fixture: ComponentFixture<CoreDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoreDropdownComponent]
    });
    fixture = TestBed.createComponent(CoreDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
