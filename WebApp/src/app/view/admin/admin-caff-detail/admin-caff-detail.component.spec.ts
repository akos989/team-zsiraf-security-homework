import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCaffDetailComponent } from './admin-caff-detail.component';

describe('AdminDetailComponent', () => {
  let component: AdminCaffDetailComponent;
  let fixture: ComponentFixture<AdminCaffDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCaffDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCaffDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
