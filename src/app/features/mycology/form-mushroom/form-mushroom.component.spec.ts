import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMushroomComponent } from './form-mushroom.component';

describe('FormMushroomComponent', () => {
  let component: FormMushroomComponent;
  let fixture: ComponentFixture<FormMushroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMushroomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormMushroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
