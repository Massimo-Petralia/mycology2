import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomImgComponent } from './custom-img.component';

describe('CustomImgComponent', () => {
  let component: CustomImgComponent;
  let fixture: ComponentFixture<CustomImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomImgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
