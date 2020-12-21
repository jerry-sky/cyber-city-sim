import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimCellPopupComponent } from './claim-cell-popup.component';

describe('ClaimCellPopupComponent', () => {
  let component: ClaimCellPopupComponent;
  let fixture: ComponentFixture<ClaimCellPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimCellPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimCellPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
