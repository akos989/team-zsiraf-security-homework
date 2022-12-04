import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedListComponent } from './purchased-list.component';

describe('PurchasedListComponent', () => {
  let component: PurchasedListComponent;
  let fixture: ComponentFixture<PurchasedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
