import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SectionService } from '../../services/section.service';
import { Section } from '../../models/section.model';


@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss']
})
export class CreateSectionComponent implements OnInit {

  sectionForm: FormGroup;
  alreadySubmitted: boolean;

  constructor(private formBuilder: FormBuilder, private sectionService: SectionService) { }

  ngOnInit(): void {
    this.initForm();
    this.alreadySubmitted= false;
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
    this.alreadySubmitted= true;
    const formValue = this.sectionForm.value;
    let isVisibleInMenu = false;
    if (formValue['isVisibleInMenu'] === "true" || formValue['isVisibleInMenu'] === true) {
      isVisibleInMenu = true;
    }
    if (formValue['isVisibleInMenu'] === "false" || formValue['isVisibleInMenu'] === false) {
      isVisibleInMenu = false;
    }
    // OBLIGATORY STATEMENT
    const newSection = new Section(
      formValue['title'].toLowerCase(),formValue['content'], isVisibleInMenu
    );
    // NON OBLIGATORY STATEMENT (NOT IN THE CREATION SECTION OF SECTION)
    newSection['orderInHeaderMenu'] = 1000;
    this.sectionService.addSection(newSection);
  }

}
