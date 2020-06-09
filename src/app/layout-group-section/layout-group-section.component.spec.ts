import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutGroupSectionComponent } from './layout-group-section.component';

describe('LayoutGroupSectionComponent', () => {
  let component: LayoutGroupSectionComponent;
  let fixture: ComponentFixture<LayoutGroupSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutGroupSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutGroupSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
