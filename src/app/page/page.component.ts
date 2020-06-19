import { Component, OnInit } from '@angular/core';
import { PageService } from '../services/page.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  loading: boolean;

  constructor(private pageService: PageService, private route: ActivatedRoute, private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) { }

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
        this.loading = false;
        this.pageService.getOnePageFromServerWithTitle("home").then(
          (response) => {
            this.page = response;
            this.isPageContact = false;
            this.isPagePrice = false;
          });
      } else {
        this.loading = true;
        this.pageService.getOnePageFromServerWithTitle(pathOfRoute).then(
          (response) => {
            setTimeout(() => {
              this.loading = false;
            }, 3000)
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

  initForm() {
    this.contactForm = this.formBuilder.group({
      name: ["", Validators.required],
      subject: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      message: ["", Validators.required]
    });
  }

  onSubmitMailForm() {
    const formValue = this.contactForm.value;

    const mail = {
      name: formValue['name'],
      subject: formValue['subject'],
      email: formValue['email'],
      message: formValue['message'],
    }

    this.httpClient.post('http://localhost:3000/alBack/mail/contact', mail).subscribe(
      (resApi) => {
        this.router.navigate(['/section/portrait']);
      },
      (error) => {
        console.log('fail enregistrement ' + error)
      }
    )

  }

}

// TODO
// POURQUOI DES FOIS IL PREND LE FAKEPATH QUAND ON EN MET BEAUCOUP DANS EDITCOMPONENT, COMMENT FAIRE UN LOADING ?
// 1. Front (types of template section et page + footer + autre ?) et loading dans l'admin section + lazyload
// 2. Test en ligne + HTTPS avec certbot et redirection (faire attention à ce qui n'a pas été envoyé au git (mailconfig, passwordwonfig pour mongo, images sur le serveur et sur le front etc...))
