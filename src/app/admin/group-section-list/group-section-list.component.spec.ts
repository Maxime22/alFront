import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSectionListComponent } from './group-section-list.component';

describe('GroupSectionListComponent', () => {
  let component: GroupSectionListComponent;
  let fixture: ComponentFixture<GroupSectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupSectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
