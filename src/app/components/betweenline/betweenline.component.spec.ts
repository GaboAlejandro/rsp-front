import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetweenlineComponent } from './betweenline.component';

describe('BetweenlineComponent', () => {
  let component: BetweenlineComponent;
  let fixture: ComponentFixture<BetweenlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetweenlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetweenlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
