import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMushroomPageComponent } from './form-mushroom-page.component';

describe('FormMushroomPageComponent', () => {
  let component: FormMushroomPageComponent;
  let fixture: ComponentFixture<FormMushroomPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMushroomPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormMushroomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
