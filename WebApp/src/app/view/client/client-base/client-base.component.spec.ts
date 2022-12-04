import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBaseComponent } from './client-base.component';

describe('ClientBaseComponent', () => {
  let component: ClientBaseComponent;
  let fixture: ComponentFixture<ClientBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
