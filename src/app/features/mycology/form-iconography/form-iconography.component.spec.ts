import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIconographyComponent } from './form-iconography.component';

describe('FormIconographyComponent', () => {
  let component: FormIconographyComponent;
  let fixture: ComponentFixture<FormIconographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormIconographyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormIconographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
