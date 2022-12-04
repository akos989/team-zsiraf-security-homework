import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeutralListComponent } from './neutral-list.component';

describe('NeutralListComponent', () => {
  let component: NeutralListComponent;
  let fixture: ComponentFixture<NeutralListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeutralListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeutralListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
