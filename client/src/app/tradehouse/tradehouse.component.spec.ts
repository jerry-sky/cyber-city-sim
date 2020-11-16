import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradehouseComponent } from './tradehouse.component';

describe('TradehouseComponent', () => {
  let component: TradehouseComponent;
  let fixture: ComponentFixture<TradehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradehouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
