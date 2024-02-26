import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeletionInformationComponent } from './dialog-deletion-information.component';

describe('DialogDeletionInformationComponent', () => {
  let component: DialogDeletionInformationComponent;
  let fixture: ComponentFixture<DialogDeletionInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDeletionInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogDeletionInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
