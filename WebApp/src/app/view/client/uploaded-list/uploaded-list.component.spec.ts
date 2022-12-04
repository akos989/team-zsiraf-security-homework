import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedListComponent } from './uploaded-list.component';

describe('UploadedListComponent', () => {
  let component: UploadedListComponent;
  let fixture: ComponentFixture<UploadedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
