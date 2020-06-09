import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupSectionComponent } from './create-group-section.component';

describe('CreateGroupSectionComponent', () => {
  let component: CreateGroupSectionComponent;
  let fixture: ComponentFixture<CreateGroupSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGroupSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGroupSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
