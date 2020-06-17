import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PageService } from '../../services/page.service';
import { Page } from '../../models/page.model';
import { mimeType } from '../mime-type.validator';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  pageForm: FormGroup;
  mainImgPreview: string;
  alreadySubmitted: boolean;
  page: any;

  constructor(private formBuilder: FormBuilder, private pageService: PageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.handleRouteChange(params));
    this.alreadySubmitted= false;
  }

  handleRouteChange(params) {
    let id = params['id'];
    this.pageService.getOnePageFromServer(id).then((response)=>{
      this.page = response;
      this.initForm(response);
    });
    
  }

  initForm(page) {
    this.pageForm = this.formBuilder.group({
      title: [page.title, Validators.required],
      content: [page.title, Validators.required],
      typeOfTemplate: [page.typeOfTemplate, Validators.required],
      mainImg: [page.mainImgUrl ? page.mainImgUrl : "", Validators.required, mimeType],
    });
    if (page.mainImgUrl) {
      this.mainImgPreview = page.mainImgUrl;
    }else{
      this.mainImgPreview = null;
    }
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
    this.pageService.editPageToServer(this.route.params['_value']['id'],newPage, formValue['mainImg']);
  }

}
