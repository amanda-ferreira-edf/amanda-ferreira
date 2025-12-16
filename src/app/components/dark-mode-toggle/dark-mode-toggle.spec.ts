import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkModeToggle } from './dark-mode-toggle';

describe('DarkModeToggle', () => {
  let component: DarkModeToggle;
  let fixture: ComponentFixture<DarkModeToggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarkModeToggle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarkModeToggle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
