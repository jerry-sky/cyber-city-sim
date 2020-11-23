import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingInfoPopupComponent } from './building-info-popup.component';

describe('BuildingInfoPopupComponent', () => {
  let component: BuildingInfoPopupComponent;
  let fixture: ComponentFixture<BuildingInfoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuildingInfoPopupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
