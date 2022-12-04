import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCaffDetailComponent } from './client-caff-detail.component';

describe('ClientCaffDetailComponent', () => {
  let component: ClientCaffDetailComponent;
  let fixture: ComponentFixture<ClientCaffDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCaffDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCaffDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
