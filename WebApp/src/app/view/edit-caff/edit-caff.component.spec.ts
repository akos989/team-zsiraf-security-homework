import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCaffComponent } from './edit-caff.component';

describe('EditCaffComponent', () => {
  let component: EditCaffComponent;
  let fixture: ComponentFixture<EditCaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
