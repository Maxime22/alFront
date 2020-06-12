import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { SectionService } from '../../services/section.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Section } from '../../models/section.model';
import { mimeType } from '../mime-type.validator'; // ?

@Component({
  selector: 'app-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.scss']
})
export class EditSectionComponent implements OnInit {

  sectionForm: FormGroup;
  userForm: FormGroup;
  newPhotoControl: FormControl;
  section: any;
  photosToSend: any[];
  // altNames: string[];
  mainImgPreview: string;

  constructor(private formBuilder: FormBuilder, private sectionService: SectionService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.handleRouteChange(params));
  }

  handleRouteChange(params) {
    let id = params['id'];
    this.section = this.sectionService.getSectionById(id);
    this.initForm(this.section);
    // this.loadPhotos();
  }

  initForm(section) {
    this.sectionForm = this.formBuilder.group({
      title: [section.title, Validators.required],
      content: [section.content, Validators.required],
      isVisibleInMenu: [section.isVisibleInMenu, Validators.required],
      orderInHeaderMenu: [section.orderInHeaderMenu ? section.orderInHeaderMenu : 1000],
      // MAIN IMG CAN BE A URL OR A FILE WHEN IT IS SENT
      mainImg: [section.mainImgUrl ? section.mainImgUrl : "", Validators.required, mimeType],
      photos: this.formBuilder.array([])
    });
    if(section.mainImgUrl){
      this.mainImgPreview = section.mainImgUrl;
    }
    this.photosToSend = [];
  }

  onMainImgPick(event: File) {
    const file = event[0];
    this.sectionForm.get('mainImg').patchValue(file);
    this.sectionForm.get('mainImg').updateValueAndValidity();
    // CREATE THE PREVIEW
    this.createPreview(file);
    
  }

  createPreview(file){
    const reader = new FileReader();
    reader.onload = () => {
      if (this.sectionForm.get('mainImg').valid) {
        this.mainImgPreview = reader.result as string;
      } else {
        this.mainImgPreview = null;
      }
    };
    reader.readAsDataURL(file);
  }

  onSubmitForm() {
    const formValue = this.sectionForm.value;
    let isVisibleInMenu = false;
    if (formValue['isVisibleInMenu'] === "true" || formValue['isVisibleInMenu'] === true) {
      isVisibleInMenu = true;
    }
    if (formValue['isVisibleInMenu'] === "false" || formValue['isVisibleInMenu'] === false) {
      isVisibleInMenu = false;
    }
    // OBLIGATORY STATEMENT
    let editedSection = new Section(
      formValue['title'].toLowerCase(), formValue['content'], isVisibleInMenu
    );
    // NON OBLIGATORY STATEMENT (NOT IN THE CREATION SECTION OF SECTION)
    editedSection['orderInHeaderMenu'] = formValue['orderInHeaderMenu'];

    // SEND TO SERVER (MAINIMG IS SENT SEPARATELY)
    this.sectionService.editSectionToServer(this.route.params['_value']['id'], editedSection, formValue['mainImg']);

    // RAJOUTER LES IMAGES POUR QU'ELLES S'AJOUTENT DANS LA SECTION, S'ENREGISTRENT ET S'UPLOADENT
    // const formData: FormData = new FormData();
    // formData.append('fichier', photoInformations, photoInformations.name);
    // this.sectionForm.value['photos'] = this.photosToSend;
    // console.log(formValue);
  }

  photoUploaded(photo: File, index) {
    let photoInformations = photo[0];
    this.photosToSend[index] = { "photoInformations": photoInformations };
  }

  getPhotos() {
    return this.sectionForm.get('photos') as FormArray;
  }

  loadPhotos() {
    if (this.section.photos !== undefined) {
      this.section.photos.forEach(photo => {
        this.onAddPhoto(photo.photoTitle,photo.typeOfPhoto);
      });
    }
  }

  onAddPhoto(photoTitle,typeOfPhoto) {
    // https://stackoverflow.com/questions/42968619/angular-2-how-to-use-array-of-objects-for-controls-in-reactive-forms
    // https://angular.io/guide/reactive-forms#nested-groups
    this.getPhotos().push(this.formBuilder.group({photoTitle: [""],typeOfPhoto: [""]}))
  }

  // onDeletePhoto(i) {
  //   this.getPhotos().removeAt(i);
  //   this.photosToSend.splice(i, 1);
  // }

}
