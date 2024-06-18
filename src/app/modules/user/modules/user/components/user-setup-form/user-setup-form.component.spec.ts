import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSetupFormComponent } from './user-setup-form.component';

describe('UserSetupFormComponent', () => {
  let component: UserSetupFormComponent;
  let fixture: ComponentFixture<UserSetupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSetupFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSetupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
