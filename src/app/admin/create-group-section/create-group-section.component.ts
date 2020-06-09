import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {GroupSectionService } from '../../services/group-section.service';
import { GroupSection } from '../../models/group-section.model';

@Component({
  selector: 'app-create-group-section',
  templateUrl: './create-group-section.component.html',
  styleUrls: ['./create-group-section.component.scss']
})
export class CreateGroupSectionComponent implements OnInit {

  groupSectionForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private groupSectionService: GroupSectionService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.groupSectionForm = this.formBuilder.group({
      title:["", Validators.required],
    });
  }

  onSubmitForm(){
    const formValue = this.groupSectionForm.value;
    const newGroupSection = new GroupSection(
      formValue['title']
    );
    this.groupSectionService.addGroupSection(newGroupSection);
  }
}
