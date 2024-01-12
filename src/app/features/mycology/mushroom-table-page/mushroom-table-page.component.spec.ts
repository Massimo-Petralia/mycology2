import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MushroomTablePageComponent } from './mushroom-table-page.component';

describe('MushroomTablePageComponent', () => {
  let component: MushroomTablePageComponent;
  let fixture: ComponentFixture<MushroomTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MushroomTablePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MushroomTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
