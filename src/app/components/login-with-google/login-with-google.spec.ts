import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWithGoogle } from './login-with-google';

describe('LoginWithGoogle', () => {
  let component: LoginWithGoogle;
  let fixture: ComponentFixture<LoginWithGoogle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginWithGoogle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginWithGoogle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
