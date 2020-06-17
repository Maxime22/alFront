import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, FormArray, FormControl } from '@angular/forms';
import { SectionService } from '../../services/section.service';
import { PhotoService } from '../../services/photo.service';
import { ActivatedRoute } from '@angular/router';
import { Section } from '../../models/section.model';
import { mimeType } from '../mime-type.validator'; // ?
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.scss']
})
export class EditSectionComponent implements OnInit {

  // THEY NEED TO BE INITIALIZED IN THE ONINIT
  sectionForm: FormGroup;
  userForm: FormGroup;
  newPhotoControl: FormControl;
  section: any;
  mainImgPreview: string;
  photosFromServerLinkedToTheSection: any[]
  photosToDelete: string[];
  photoImgPreviews: string[];
  alreadySubmitted:boolean;

  constructor(private formBuilder: FormBuilder, private sectionService: SectionService, private photoService: PhotoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.handleRouteChange(params));
    this.alreadySubmitted= false;
  }

  handleRouteChange(params) {
    let id = params['id'];
    this.section = this.sectionService.getSectionById(id);
    this.initForm(this.section);
    this.loadPhotos();
  }

  initForm(section) {
    this.sectionForm = this.formBuilder.group({
      title: [section.title, Validators.required],
      content: [section.content, Validators.required],
      isVisibleInMenu: [section.isVisibleInMenu, Validators.required],
      orderInHeaderMenu: [section.orderInHeaderMenu ? section.orderInHeaderMenu : 1000],
      templatePhotos: [section.templatePhotos ? section.templatePhotos : "template1"],
      // MAIN IMG CAN BE A URL OR A FILE WHEN IT IS SENT
      mainImg: [section.mainImgUrl ? section.mainImgUrl : "", Validators.required, mimeType],
      photos: this.formBuilder.array([])
    });
    if (section.mainImgUrl) {
      this.mainImgPreview = section.mainImgUrl;
    }else{
      this.mainImgPreview = null;
    }
    this.photoImgPreviews = [];
    this.photosToDelete = [];
  }

  createMainImgPreview(file) {
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
  createPhotoPreview(photoFile, index) {
    const reader = new FileReader();
    reader.onload = () => {
      this.photoImgPreviews[index] = reader.result as string;
    };
    reader.readAsDataURL(photoFile);
  }

  onSubmitForm() {
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
    let editedSection = new Section(
      formValue['title'].toLowerCase(), formValue['content'], isVisibleInMenu
    );
    // NON OBLIGATORY STATEMENT (NOT IN THE CREATION SECTION OF SECTION)
    editedSection['orderInHeaderMenu'] = formValue['orderInHeaderMenu'];
    editedSection['templatePhotos'] = formValue['templatePhotos'];

    if (this.photosToDelete.length > 0) {
      this.photoService.deletePhotosOfASectionToServer(this.photosToDelete);
    }

    this.photoService.editPhotosOfASectionToServer(this.route.params['_value']['id'], formValue['photos']).then((response) => {
      // console.log("response after then photo server ", response)
      // SEND TO SERVER (MAINIMG IS SENT SEPARATELY IN THE PARAMETERS)
      this.sectionService.editSectionToServer(this.route.params['_value']['id'], editedSection, formValue['mainImg']);
    })
  }

  onMainImgPick(event: File) {
    const file = event[0];
    this.sectionForm.get('mainImg').patchValue(file);
    this.sectionForm.get('mainImg').updateValueAndValidity();
    // CREATE THE PREVIEW MAIN IMG
    this.createMainImgPreview(file);
  }

  onPhotoUploaded(event: File, index) {
    let photoFile = event[0];
    // INDEX OF SECTIONFORM VALUE EXISTS BECAUSE IT HAS BEEN CREATED BEFORE WE CAN USE ONPHOTOUPLOADED AND THE INDEX CORRESPONDS TO THE INDEX OF THE SECTIONFORMVALUE BECAUSE THE FORMGROUP IS MADE BY THE SECTIONFORMVALUE
    this.sectionForm.value["photos"][index]["photoImg"] = photoFile
    this.createPhotoPreview(photoFile, index);
  }

  getPhotos() {
    return this.sectionForm.get('photos') as FormArray;
  }

  loadPhotos() {
    this.photoService.getPhotosOfASectionFromServer(this.route.params['_value']['id']).then((data) => {
      if (data['photos']) {
        this.photosFromServerLinkedToTheSection = data['photos'];
        if (this.photosFromServerLinkedToTheSection.length > 0) {
          for (let index = 0; index < this.photosFromServerLinkedToTheSection.length; index++) {
            const photo = this.photosFromServerLinkedToTheSection[index];
            this.onAddPhoto(photo.photoTitle, photo.typeOfPhoto, photo.photoImgUrl, photo._id, 1000);
          }
        }
      }
    })

  }

  onAddPhoto(photoTitleParam, typeOfPhotoParam, photoImgParam, photoId = null, orderInPhotosParam = 1000) {
    // WE CREATE A NEW INDEX FOR EACH PHOTOIMGPREVIEWS
    this.photoImgPreviews.push(photoImgParam);
    // https://stackoverflow.com/questions/42968619/angular-2-how-to-use-array-of-objects-for-controls-in-reactive-forms
    // https://angular.io/guide/reactive-forms#nested-groups
    // CREATE CONTROLS
    this.getPhotos().push(this.formBuilder.group({ photoTitle: [photoTitleParam, [Validators.required, RxwebValidators.unique()]], typeOfPhoto: [typeOfPhotoParam, Validators.required], photoImg: [photoImgParam, Validators.required, mimeType], orderInPhotos: [orderInPhotosParam, Validators.required], photoId: photoId }))
  }

  onDeletePhoto(i) {
    if (confirm("Sûre de vouloir supprimer la photo ?")) {

      let idOfThePhoto = this.getPhotos().controls[i].value["photoId"]
      if (idOfThePhoto !== null && idOfThePhoto !== undefined) {
        this.photosToDelete.push(idOfThePhoto);
      }
      this.getPhotos().removeAt(i);
      this.photoImgPreviews.splice(i, 1);
    }
  }

  getFormValidationErrors() {
    let photoArray = this.getPhotos();
    let errors = []

    Object.keys(this.sectionForm.controls).forEach(key => {
      const controlMainErrors: ValidationErrors = this.sectionForm.get(key).errors;
      if (controlMainErrors != null) {
        Object.keys(controlMainErrors).forEach(keyError => {
          // console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlMainErrors[keyError]);
          if (key === "photoTitle" && keyError === "unique") {
            errors.push('Au moins 2 titres de photos sont similaires, ils ne doivent pas être similaires')
          }
          if (key === "photoTitle" && keyError === "required") {
            errors.push('Un titre de photo est manquant')
          }
          if (key === "typeOfPhoto" && keyError === "required") {
            errors.push('Un type de photo est manquant')
          }
          if (key === "photoImg" && keyError === "required") {
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
              if (key === "photoTitle" && keyError === "unique") {
                errors.push('Au moins 2 titres de photos sont similaires, ils ne doivent pas être similaires')
              }
              if (key === "photoTitle" && keyError === "required") {
                errors.push('Un titre de photo est manquant')
              }
              if (key === "typeOfPhoto" && keyError === "required") {
                errors.push('Un type de photo est manquant')
              }
              if (key === "photoImg" && keyError === "required") {
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

// POURQUOI DES FOIS IL PREND LE FAKEPATH QUAND ON EN MET BEAUCOUP, COMMENT FAIRE UN LOADING ?
// 1. OrderInPhotos (photo) OK ?
// 2. Type Of Template (section) OK ?
// 3. CKEDITOR4 OK
// 4. Pages (réfléchir à tous les attributs et à la page contact aussi)
// 5. Auth
// 6. Front et loading dans l'admin section
// 7. Test en ligne + HTTPS avec certbot et redirection