import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PageService } from '../../services/page.service';
import { Page } from '../../models/page.model';
import { mimeType } from '../mime-type.validator';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  pageForm: FormGroup;
  mainImgPreview: string;
  alreadySubmitted: boolean;

  constructor(private formBuilder: FormBuilder, private pageService: PageService) { }

  ngOnInit(): void {
    this.initForm();
    this.alreadySubmitted = false;
  }

  initForm() {
    this.pageForm = this.formBuilder.group({
      title: ["", Validators.required],
      content: ["", Validators.required],
      typeOfTemplate: ["contact", Validators.required],
      mainImg: ["", Validators.required, mimeType],
    });
    this.mainImgPreview = "";
  }

  onMainImgPick(event: File) {
    const file = event[0];
    this.pageForm.get('mainImg').patchValue(file);
    this.pageForm.get('mainImg').updateValueAndValidity();
    this.createMainImgPreview(file);
  }

  createMainImgPreview(file) {
    const reader = new FileReader();
    reader.onload = () => {
      if (this.pageForm.get('mainImg').valid) {
        this.mainImgPreview = reader.result as string;
      } else {
        this.mainImgPreview = null;
      }
    };
    reader.readAsDataURL(file);
  }

  onSubmitForm() {
    this.alreadySubmitted = true;
    const formValue = this.pageForm.value;
    const newPage = new Page(
      formValue['title'].toLowerCase(), formValue['content'], formValue['typeOfTemplate']
    );
    this.pageService.savePageToServer(newPage, formValue['mainImg']);
  }
}
