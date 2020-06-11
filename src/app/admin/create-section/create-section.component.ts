import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SectionService } from '../../services/section.service';
import { Section } from '../../models/section.model';


@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss']
})
export class CreateSectionComponent implements OnInit {

  sectionForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private sectionService: SectionService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.sectionForm = this.formBuilder.group({
      title:["", Validators.required],
      content:["", Validators.required],
      isVisibleInMenu: [false, Validators.required]
      // hobbies:this.formBuilder.array([])
    });
  }

  onSubmitForm(){
    const formValue = this.sectionForm.value;
    let isVisibleInMenu = false;
    if(formValue['isVisibleInMenu'] === "true"){
      isVisibleInMenu = true;
    }
    if(formValue['isVisibleInMenu'] === "false"){
      isVisibleInMenu = false;
    }
    const newSection = new Section(
      formValue['title'].toLowerCase(),formValue['content'], isVisibleInMenu
    );
    this.sectionService.addSection(newSection);
  }

}
