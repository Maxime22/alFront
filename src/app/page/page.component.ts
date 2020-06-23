import { Component, OnInit } from '@angular/core';
import { PageService } from '../services/page.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PriceService } from '../services/price.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  page: any;
  isPageContact: boolean;
  isPagePrice: boolean;
  isPageConf: boolean;
  contactForm: FormGroup;
  loading: boolean;
  prices: any;
  pageScroll: number;
  displayButtonScroll: boolean;

  constructor(private pageService: PageService, private route: ActivatedRoute, private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router, private priceService: PriceService) { }

  ngOnInit(): void {
    this.isPageContact = false;
    this.isPagePrice = false;
    this.route.params.subscribe(params => this.handleRouteChange(params));
  }

  handleRouteChange(params) {
    this.onScroll('');
    // WE DON'T USE PARAMS BUT THIS.ROUTE.PARAMS.SUBSCRIBE ALLOWS TO REFRESH THE PAGE
    let pathOfRoute = this.route.snapshot.routeConfig.path;
    if (pathOfRoute === "price" || pathOfRoute === "contact" || pathOfRoute === "" || pathOfRoute === "privacypolicy") {
      if (pathOfRoute === "") {
        this.loading = false;
        this.pageService.getOnePageFromServerWithTitle("home").then(
          (response) => {
            this.page = response;
            this.isPageContact = false;
            this.isPagePrice = false;
          });
      } else if (pathOfRoute === "privacypolicy") {
        this.loading = true;
        this.pageService.getOnePageFromServerWithTitle("politique de confidentialité").then(
          (response) => {
            setTimeout(() => {
              this.loading = false;
            }, 3000)
            this.page = response;
            this.isPageConf = true;
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
              this.initContactForm();
              this.isPageContact = true;
              this.isPagePrice = false;
              this.isPageConf = false;
            }
            if (pathOfRoute === "price") {
              this.priceService.getPricesFromServer().then((data) => {
                this.prices = data;
              });
              this.isPageContact = false;
              this.isPagePrice = true;
              this.isPageConf = false;
            }
          });
      }

    }
  }

  getHeaderAndFooter() {
    if (this.page) {
      if (this.page.title === "price" || this.page.title === "contact" || this.page.title === "politique de confidentialité") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  initContactForm() {
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

  scrollToElement($element) {
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
  onScroll(event) {
    this.pageScroll = window.pageYOffset;
    if (this.pageScroll > 300) {
      this.displayButtonScroll = true;
    } else {
      this.displayButtonScroll = false;
    }
  }

}

// TODO
// loading dans l'admin section + lazyload
// 2. Test en ligne + HTTPS avec certbot et redirection (faire attention à ce qui n'a pas été envoyé au git (mailconfig, passwordconfig pour mongo, images sur le serveur et sur le front etc...))
