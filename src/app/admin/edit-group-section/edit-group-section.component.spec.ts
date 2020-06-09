import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGroupSectionComponent } from './edit-group-section.component';

describe('EditGroupSectionComponent', () => {
  let component: EditGroupSectionComponent;
  let fixture: ComponentFixture<EditGroupSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGroupSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
