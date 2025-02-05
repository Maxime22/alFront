import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSectionComponent } from './group-section.component';

describe('GroupSectionComponent', () => {
  let component: GroupSectionComponent;
  let fixture: ComponentFixture<GroupSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
