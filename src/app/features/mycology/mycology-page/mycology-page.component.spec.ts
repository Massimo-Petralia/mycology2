import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycologyPageComponent } from './mycology-page.component';

describe('MycologyPageComponent', () => {
  let component: MycologyPageComponent;
  let fixture: ComponentFixture<MycologyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MycologyPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MycologyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
