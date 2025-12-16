import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FemaleAnamnese } from './female-anamnese';

describe('FemaleAnamnese', () => {
  let component: FemaleAnamnese;
  let fixture: ComponentFixture<FemaleAnamnese>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FemaleAnamnese]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FemaleAnamnese);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
