import { Component, OnInit } from '@angular/core';
import { PageService } from '../services/page.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PriceService } from '../services/price.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  animations: [
    trigger('changeOpacity', [
      state('initial', style({
        opacity: 1,
        display: 'block'
      })),
      state('final', style({
        opacity: 0,
        display: 'none'
      })),
      transition('initial=>final', animate('3000ms')),
      transition('final=>initial', animate('1000ms'))
    ]),
  ]
})
export class PageComponent implements OnInit {

  page: any;
  isPageContact: boolean;
  isPagePrice: boolean;
  isPageConf: boolean;
  isPageLegal: boolean;
  contactForm: FormGroup;
  prices: any;
  pageScroll: number;
  displayButtonScroll: boolean;
  alreadySubmitted: boolean;
  currentState = 'initial';

  constructor(private pageService: PageService, private route: ActivatedRoute, private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router, private priceService: PriceService) { }

  ngOnInit(): void {
    this.displayButtonScroll = false;
    this.isPageContact = false;
    this.isPagePrice = false;
    this.isPageConf = false;
    this.isPageLegal = false;
    this.route.params.subscribe(params => this.handleRouteChange(params));
  }

  handleRouteChange(params) {
    this.displayButtonScroll = false;
    this.alreadySubmitted = false;
    this.onScroll('');
    // WE DON'T USE PARAMS BUT THIS.ROUTE.PARAMS.SUBSCRIBE ALLOWS TO REFRESH THE PAGE
    let pathOfRoute = this.route.snapshot.routeConfig.path;
    if (pathOfRoute === "price" || pathOfRoute === "contact" || pathOfRoute === "" || pathOfRoute === "legalnotices") {
      if (pathOfRoute === "") {
        this.pageService.getOnePageFromServerWithTitle("home").then(
          (response) => {
            this.changeState();
            this.page = response;
            this.isPageContact = false;
            this.isPagePrice = false;
            this.isPageConf = false;
            this.isPageLegal = false;
          });
      } else if (pathOfRoute === "legalnotices") {
        this.pageService.getOnePageFromServerWithTitle("mentions légales").then(
          (response) => {
            this.changeState();
            this.page = response;
            this.isPageLegal = true;
            this.isPageConf = false;
            this.isPageContact = false;
            this.isPagePrice = false;
          });
      } else {
        this.pageService.getOnePageFromServerWithTitle(pathOfRoute).then(
          (response) => {
            this.changeState();
            this.page = response;
            if (pathOfRoute === "contact") {
              this.initContactForm();
              this.isPageContact = true;
              this.isPagePrice = false;
              this.isPageConf = false;
              this.isPageLegal = false;
            }
            if (pathOfRoute === "price") {
              this.priceService.getPricesFromServer().then((data: any) => {
                let pricesInOrder = data;
                pricesInOrder.sort(function (a, b) {
                  return Number(a.orderInPrices) - Number(b.orderInPrices);
                });
                this.prices = pricesInOrder;
              });
              this.isPageContact = false;
              this.isPagePrice = true;
              this.isPageConf = false;
              this.isPageLegal = false;
            }
          });
      }

    }
  }

  getHeaderAndFooter() {
    if (this.page) {
      if (this.page.title === "price" || this.page.title === "contact" || this.page.title === "politique de confidentialité" || this.page.title === "mentions légales") {
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
    this.alreadySubmitted = true;

    const formValue = this.contactForm.value;

    const mail = {
      name: formValue['name'],
      subject: formValue['subject'],
      email: formValue['email'],
      message: formValue['message'],
    }

    let urlApi = "/alBack/mail/contact";
    if (window.location.hostname === "localhost") {
      urlApi = "http://localhost:3000" + urlApi;
    }

    this.httpClient.post(urlApi, mail).subscribe(
      (resApi) => {
        alert('Message envoyé !');
        // this.router.navigate(['/']);
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
    if (this.pageScroll > 300 && event !== "" && event.target.innerWidth > 845) {
      this.displayButtonScroll = true;
    } else {
      this.displayButtonScroll = false;
    }
  }
  onResize(event) {
    this.onScroll(event);
  }

  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

}

// TODO
// loading dans l'admin section + lazyload
// 2. Test en ligne + HTTPS avec certbot et redirection (faire attention à ce qui n'a pas été envoyé au git (mailconfig, passwordconfig pour mongo, images sur le serveur et sur le front etc...))
