import { Component, OnInit } from '@angular/core';
import { PageService } from '../services/page.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  page: any;
  isPageContact: boolean;
  isPagePrice: boolean;
  contactForm: FormGroup;

  constructor(private pageService: PageService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.isPageContact = false;
    this.isPagePrice = false;
    this.route.params.subscribe(params => this.handleRouteChange(params));
  }

  handleRouteChange(params) {
    // WE DON'T USE PARAMS BUT THIS.ROUTE.PARAMS.SUBSCRIBE ALLOWS TO REFRESH THE PAGE
    let pathOfRoute = this.route.snapshot.routeConfig.path;
    if (pathOfRoute === "price" || pathOfRoute === "contact" || pathOfRoute === "") {
      if (pathOfRoute === "") {
        this.pageService.getOnePageFromServerWithTitle("home").then(
          (response) => {
            this.page = response;
            this.isPageContact = false;
            this.isPagePrice = false;
          });
      } else {
        this.pageService.getOnePageFromServerWithTitle(pathOfRoute).then(
          (response) => {
            this.page = response;
            if (pathOfRoute === "contact") {
              this.initForm();
              this.isPageContact = true;
              this.isPagePrice = false;
            }
            if (pathOfRoute === "price") {
              this.isPageContact = false;
              this.isPagePrice = true;
            }
          });
      }

    }
  }

  getHeaderAndFooter() {
    if (this.page) {
      if (this.page.title === "price" || this.page.title === "contact") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  initForm(){
    this.contactForm = this.formBuilder.group({
      name:["", Validators.required],
      email:["", Validators.required],
    });
  }

}

// POURQUOI DES FOIS IL PREND LE FAKEPATH QUAND ON EN MET BEAUCOUP DANS EDITCOMPONENT, COMMENT FAIRE UN LOADING ?
// 1. OrderInPhotos (photo) OK ?
// 2. Type Of Template (section) OK ?
// 3. CKEDITOR4 OK
// 4. Pages OK
// 5. Formulaire de contact
// 5. Auth
// 6. Front et loading dans l'admin section
// 7. Test en ligne + HTTPS avec certbot et redirection
