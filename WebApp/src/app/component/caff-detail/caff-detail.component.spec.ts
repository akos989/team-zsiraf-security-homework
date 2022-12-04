import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaffDetailComponent } from './caff-detail.component';

describe('CaffDetailComponent', () => {
  let component: CaffDetailComponent;
  let fixture: ComponentFixture<CaffDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaffDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaffDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
