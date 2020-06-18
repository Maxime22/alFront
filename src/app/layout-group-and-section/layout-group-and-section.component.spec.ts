import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutGroupAndSectionComponent } from './layout-group-and-section.component';

describe('LayoutGroupAndSectionComponent', () => {
  let component: LayoutGroupAndSectionComponent;
  let fixture: ComponentFixture<LayoutGroupAndSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutGroupAndSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutGroupAndSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
