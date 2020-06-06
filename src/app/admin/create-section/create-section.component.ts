import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SectionService } from '../../services/section.service';
import { Router } from '@angular/router';
import { Section } from '../../models/section.model';


@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss']
})
export class CreateSectionComponent implements OnInit {

  sectionForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private sectionService: SectionService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.sectionForm = this.formBuilder.group({
      title:["", Validators.required],
      content:["", Validators.required],
      // hobbies:this.formBuilder.array([])
    });
  }

  onSubmitForm(){
    const formValue = this.sectionForm.value;
    // console.log(formValue)
    const newSection = new Section(
      formValue['title'],formValue['content']
    );
    this.sectionService.addSection(newSection);
    this.router.navigate(['/admin']);
  }

  // getHobbies(){
  //   return this.sectionForm.get('hobbies') as FormArray;
  // }

  // onAddHobby(){
  //   const newHobbyControl = this.formBuilder.control("",Validators.required)
  //   this.getHobbies().push(newHobbyControl);
  // }

  // onDeleteHobby(i){
  //   this.getHobbies().removeAt(i);
  // }

}
