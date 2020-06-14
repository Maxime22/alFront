import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, FormArray, FormControl } from '@angular/forms';
import { SectionService } from '../../services/section.service';
import { PhotoService } from '../../services/photo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Section } from '../../models/section.model';
import { mimeType } from '../mime-type.validator'; // ?
import { RxwebValidators } from '@rxweb/reactive-form-validators';

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
  mainImgPreview: string;

  constructor(private formBuilder: FormBuilder, private sectionService: SectionService, private photoService: PhotoService, private router: Router, private route: ActivatedRoute) { }

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
    if (section.mainImgUrl) {
      this.mainImgPreview = section.mainImgUrl;
    }
    this.photosToSend = [];
  }

  createPreview(file) {
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

    this.photoService.editPhotosOfASectionToServer(this.route.params['_value']['id'], formValue['photos']).then((response) => {
      console.log("response after then photo server ", response)

      // ADD THE ID OF THE RESPONSE HERE

      // SEND TO SERVER (MAINIMG IS SENT SEPARATELY IN THE PARAMETERS)
      this.sectionService.editSectionToServer(this.route.params['_value']['id'], editedSection, formValue['mainImg']);
    })

    // RAJOUTER LES IMAGES POUR QU'ELLES S'AJOUTENT DANS LA SECTION, S'ENREGISTRENT ET S'UPLOADENT
    // 1 envoyer une photo sans images et l'enregistrer dans la bdd
    // relié cette photo sans images à la section dans la bdd
    // le faire pour 2 photos
    // ajouter un fichier image dans l'envoi et gérer les nombreux cas

    // checker pour l'envoi d'une relation en Mongo
  }

  onMainImgPick(event: File) {
    const file = event[0];
    this.sectionForm.get('mainImg').patchValue(file);
    this.sectionForm.get('mainImg').updateValueAndValidity();
    console.log(this.sectionForm.get('mainImg'))
    // CREATE THE PREVIEW
    this.createPreview(file);

  }

  onPhotoUploaded(event: File, index) {
    let photoFile = event[0];

    // if (this.photosToSend[index]){
    //   this.photosToSend[index] = {file:photoFile,indexInForm:index}
    // }else{
    //   this.photosToSend.push({file:photoFile,indexInForm:index})
    // }
    // INDEX OF SECTIONFORM VALUE EXISTS BECAUSE IT HAS BEEN CREATED BEFORE WE CAN USE ONPHOTOUPLOADED AND THE INDEX CORRESPONDS TO THE INDEX OF THE SECTIONFORMVALUE BECAUSE THE FORMGROUP IS MADE BY THE SECTIONFORMVALUE
    this.sectionForm.value["photos"][index]["photoImg"] = photoFile;
  }

  getPhotos() {
    return this.sectionForm.get('photos') as FormArray;
  }

  loadPhotos() {
    if (this.section.photos !== undefined) {
      this.section.photos.forEach(photo => {
        this.onAddPhoto(photo.photoTitle, photo.typeOfPhoto, photo.photoImgUrl);
      });
    }
  }

  onAddPhoto(photoTitleParam, typeOfPhotoParam, photoImgParam) {
    // https://stackoverflow.com/questions/42968619/angular-2-how-to-use-array-of-objects-for-controls-in-reactive-forms
    // https://angular.io/guide/reactive-forms#nested-groups
    // CREATE CONTROLS
    this.getPhotos().push(this.formBuilder.group({ photoTitle: [photoTitleParam, [Validators.required, RxwebValidators.unique()]], typeOfPhoto: [typeOfPhotoParam, Validators.required], photoImg: [photoImgParam, Validators.required, mimeType] }))
  }

  // onDeletePhoto(i) {
  //   this.getPhotos().removeAt(i);
  //   this.photosToSend.splice(i, 1);
  // }

  getFormValidationErrors() {
    let photoArray = this.getPhotos();
    let errors = []

    Object.keys(this.sectionForm.controls).forEach(key => {
      const controlMainErrors: ValidationErrors = this.sectionForm.get(key).errors;
      if (controlMainErrors != null) {
        Object.keys(controlMainErrors).forEach(keyError => {
          // console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlMainErrors[keyError]);
          if(key === "photoTitle" && keyError === "unique"){
            errors.push('Au moins 2 titres de photos sont similaires, ils ne doivent pas être similaires')
          }
          if(key === "photoTitle" && keyError === "required"){
            errors.push('Un titre de photo est manquant')
          }
          if(key === "typeOfPhoto" && keyError === "required"){
            errors.push('Un type de photo est manquant')
          }
          if(key === "photoImg" && keyError === "required"){
            errors.push("Une image photo n'a pas été uploadée");
          }
          
        });
      }
    });

    if (photoArray.controls.length > 0) {
      for (let index = 0; index < photoArray.controls.length; index++) {
        const element = photoArray.controls[index] as FormGroup;
        const elementControls = element.controls;
        Object.keys(elementControls).forEach(key => {
          const controlErrors: ValidationErrors = element.get(key).errors;
          if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              // console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
              if(key === "photoTitle" && keyError === "unique"){
                errors.push('Au moins 2 titres de photos sont similaires, ils ne doivent pas être similaires')
              }
              if(key === "photoTitle" && keyError === "required"){
                errors.push('Un titre de photo est manquant')
              }
              if(key === "typeOfPhoto" && keyError === "required"){
                errors.push('Un type de photo est manquant')
              }
              if(key === "photoImg" && keyError === "required"){
                errors.push("Une image photo n'a pas été uploadée");
              }
            });
          }
        });
      }

      return errors;
      
    }
  }

}
