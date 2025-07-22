import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackholeComponent } from './blackhole.component';

describe('BlackholeComponent', () => {
  let component: BlackholeComponent;
  let fixture: ComponentFixture<BlackholeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlackholeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackholeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
