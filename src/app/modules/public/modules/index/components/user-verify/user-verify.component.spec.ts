import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVerifyComponent } from './user-verify.component';

describe('UserVerifyComponent', () => {
  let component: UserVerifyComponent;
  let fixture: ComponentFixture<UserVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserVerifyComponent]
    });
    fixture = TestBed.createComponent(UserVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
