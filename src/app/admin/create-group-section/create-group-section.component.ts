import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {GroupSectionService } from '../../services/group-section.service';
import { GroupSection } from '../../models/group-section.model';
import { SectionService } from '../../services/section.service';

@Component({
  selector: 'app-create-group-section',
  templateUrl: './create-group-section.component.html',
  styleUrls: ['./create-group-section.component.scss']
})
export class CreateGroupSectionComponent implements OnInit {

  groupSectionForm: FormGroup;
  sections: any;

  constructor(private formBuilder: FormBuilder, private groupSectionService: GroupSectionService, private sectionService: SectionService) { }

  ngOnInit(): void {
    this.updateServerDatas();
    this.initForm();
  }

  updateServerDatas(){
    this.sectionService.getSectionsFromServer().then(
      (sections) => {
        this.sections = sections;
    }
    );
  }

  initForm(){
    this.groupSectionForm = this.formBuilder.group({
      title:["", Validators.required],
      sectionsIds:[[], Validators.required],
    });
  }

  onSubmitForm(){
    const formValue = this.groupSectionForm.value;
    const newGroupSection = new GroupSection(
      formValue['title'].toLowerCase(),formValue['sectionsIds']
    );
    this.groupSectionService.addGroupSection(newGroupSection);
  }
}
