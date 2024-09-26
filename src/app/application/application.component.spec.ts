import { ComponentFixture, TestBed } from '@angular/core/testing';

import { applicationComponent } from './application.component';

describe('ApplicationComponent', () => {
  let component: applicationComponent;
  let fixture: ComponentFixture<applicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [applicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(applicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
