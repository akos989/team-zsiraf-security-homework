import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNavigationBarComponent } from './client-navigation-bar.component';

describe('NavigationComponent', () => {
  let component: ClientNavigationBarComponent;
  let fixture: ComponentFixture<ClientNavigationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientNavigationBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
