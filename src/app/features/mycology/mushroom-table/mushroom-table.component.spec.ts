import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MushroomTableComponent } from './mushroom-table.component';

describe('MushroomTableComponent', () => {
  let component: MushroomTableComponent;
  let fixture: ComponentFixture<MushroomTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MushroomTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MushroomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
