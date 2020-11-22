import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBuildingPopupComponent } from './new-building-popup.component';

describe('NewBuildingPopupComponent', () => {
  let component: NewBuildingPopupComponent;
  let fixture: ComponentFixture<NewBuildingPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBuildingPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBuildingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
