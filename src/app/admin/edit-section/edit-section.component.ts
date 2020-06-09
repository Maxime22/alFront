import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { SectionService } from '../../services/section.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Section } from '../../models/section.model';

@Component({
  selector: 'app-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.scss']
})
export class EditSectionComponent implements OnInit {

  sectionForm: FormGroup;
  newPhotoControl: FormControl;
  section: any;
  photosToSend: any[];
  // @Input() title: string; // PAS SUR QUE LE INPUT SOIT UTILE
  // imageURLs: string[];
  // altNames: string[];

  constructor(private formBuilder: FormBuilder, private sectionService: SectionService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.handleRouteChange(params));
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
      photos: this.formBuilder.array([])
    });
    this.photosToSend = [];
  }

  photoUploaded(photo: File, index) {
    let photoInformations = photo[0];
    this.photosToSend[index] = {"photoInformations":photoInformations};
  }

  getPhotos() {
    return this.sectionForm.get('photos') as FormArray;
  }

  loadPhotos() {
    if (this.section.photos !== undefined) {
      this.section.photos.forEach(photoName => {
        this.onAddPhoto(photoName);
      });
    }
  }

  onAddPhoto(photo) {
    if (photo === '') {
      this.newPhotoControl = this.formBuilder.control(photo, Validators.required)
    } else {
      this.newPhotoControl = this.formBuilder.control("/coucou/" + photo, Validators.required)
    }
    this.getPhotos().push(this.newPhotoControl);
  }

  onDeletePhoto(i) {
    this.getPhotos().removeAt(i);
    this.photosToSend.splice(i,1);
  }

  onSubmitForm() {
    const formValue = this.sectionForm.value;
    const editedSection = new Section(
      formValue['title'], formValue['content']
    );
    this.sectionService.editSectionToServer(this.route.params['_value']['id'],editedSection);

    // RAJOUTER LES IMAGES POUR QU'ELLES S'AJOUTENT DANS LA SECTION, S'ENREGISTRENT ET S'UPLOADENT
    // const formData: FormData = new FormData();
    // formData.append('fichier', photoInformations, photoInformations.name);
    // this.sectionForm.value['photos'] = this.photosToSend;
    // console.log(formValue);
  }

}
