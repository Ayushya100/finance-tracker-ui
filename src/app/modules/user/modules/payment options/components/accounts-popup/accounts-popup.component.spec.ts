import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsPopupComponent } from './accounts-popup.component';

describe('AccountsPopupComponent', () => {
  let component: AccountsPopupComponent;
  let fixture: ComponentFixture<AccountsPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountsPopupComponent]
    });
    fixture = TestBed.createComponent(AccountsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
