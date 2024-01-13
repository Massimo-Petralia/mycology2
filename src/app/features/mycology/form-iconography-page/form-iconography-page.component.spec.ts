import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIconographyPageComponent } from './form-iconography-page.component';

describe('FormIconographyPageComponent', () => {
  let component: FormIconographyPageComponent;
  let fixture: ComponentFixture<FormIconographyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormIconographyPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormIconographyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
