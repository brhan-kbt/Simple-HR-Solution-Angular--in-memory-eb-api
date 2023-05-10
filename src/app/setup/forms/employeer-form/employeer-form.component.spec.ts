import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeerFormComponent } from './employeer-form.component';

describe('EmployeerFormComponent', () => {
  let component: EmployeerFormComponent;
  let fixture: ComponentFixture<EmployeerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
