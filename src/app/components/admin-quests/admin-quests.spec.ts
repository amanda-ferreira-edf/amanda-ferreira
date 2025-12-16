import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuests } from './admin-quests';

describe('AdminQuests', () => {
  let component: AdminQuests;
  let fixture: ComponentFixture<AdminQuests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminQuests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminQuests);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
