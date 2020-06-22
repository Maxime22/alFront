import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { PageService } from '../../services/page.service';
import { Page } from '../../models/page.model';
import { mimeType } from '../mime-type.validator';
import { PriceService } from '../../services/price.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

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
  pricesToDelete: string[];
  priceImgPreviews: string[];
  pricesFromServer: any[];
  isPricePage: boolean;
  isContactPage: boolean;

  constructor(private formBuilder: FormBuilder, private pageService: PageService, private route: ActivatedRoute, private priceService: PriceService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.handleRouteChange(params));
    this.alreadySubmitted = false;
  }

  handleRouteChange(params) {
    let id = params['id'];
    this.pageService.getOnePageFromServer(id).then((response) => {
      this.page = response;
      this.initForm(response);
    });

  }

  initForm(page) {
    this.pageForm = this.formBuilder.group({
      title: [page.title, Validators.required],
      content: [page.content, Validators.required],
      typeOfTemplate: [page.typeOfTemplate, Validators.required],
      mainImg: [page.mainImgUrl ? page.mainImgUrl : "", Validators.required, mimeType],
    });
    if (page.title === "contact") {
      this.isContactPage = true;
      this.pageForm.addControl("content2", new FormControl(page.content2 ? page.content2 : ""));
    }
    if (page.title === "price") {
      this.isPricePage = true;
      this.loadPrices();
      this.pageForm.addControl("prices", this.formBuilder.array([]))
      this.priceImgPreviews = [];
      this.pricesToDelete = [];
    }
    if (page.mainImgUrl) {
      this.mainImgPreview = page.mainImgUrl;
    } else {
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
    const editedPage = new Page(
      formValue['title'].toLowerCase(), formValue['content'], formValue['typeOfTemplate']
    );

    if (formValue['content2']) {
      editedPage['content2'] = formValue['content2'];
    }

    if (this.pricesToDelete) {
      if (this.pricesToDelete.length > 0) {
        this.priceService.deletePricesToServer(this.pricesToDelete);
      }
    }

    if (this.isPricePage) {
      this.priceService.editPricesToServer(formValue['prices']).then((response) => {
        this.pageService.editPageToServer(this.route.params['_value']['id'], editedPage, formValue['mainImg']);
      })
    } else {
      this.pageService.editPageToServer(this.route.params['_value']['id'], editedPage, formValue['mainImg']);
    }

  }

  createPricePreview(priceFile, index) {
    const reader = new FileReader();
    reader.onload = () => {
      this.priceImgPreviews[index] = reader.result as string;
    };
    reader.readAsDataURL(priceFile);
  }

  onPriceUploaded(event: File, index) {
    let priceFile = event[0];
    this.pageForm.value["prices"][index]["priceImg"] = priceFile
    this.createPricePreview(priceFile, index);
  }

  getPrices() {
    return this.pageForm.get('prices') as FormArray;
  }

  loadPrices() {
    this.priceService.getPricesFromServer().then((data: []) => {
      console.log(data)
      if (data.length > 0) {
        this.pricesFromServer = data;
        if (this.pricesFromServer.length > 0) {
          for (let index = 0; index < this.pricesFromServer.length; index++) {
            const price = this.pricesFromServer[index];
            let orderInPrices = 1000;
            if (price.orderInPrices) {
              orderInPrices = price.orderInPrices;
            }
            this.onAddPrice(price.priceTitle, price.priceNumber, price.priceImgUrl, price._id, orderInPrices, price.content);
          }
        }
      }
    })

  }

  onAddPrice(priceTitleParam, priceNumberParam, priceImgParam, priceId = null, orderInPricesParam = 1000, contentParam = "") {
    // WE CREATE A NEW INDEX FOR EACH PRICEIMGPREVIEWS
    this.priceImgPreviews.push(priceImgParam);
    this.getPrices().push(this.formBuilder.group({ priceTitle: [priceTitleParam, [Validators.required, RxwebValidators.unique()]], priceNumber: [priceNumberParam, Validators.required], priceImg: [priceImgParam, Validators.required, mimeType], orderInPrices: [orderInPricesParam, Validators.required], contentPrice: [contentParam], priceId: priceId }))
  }

  onDeletePrice(i) {
    if (confirm("Sûre de vouloir supprimer le tarif ?")) {

      let idOfThePrice = this.getPrices().controls[i].value["priceId"]
      if (idOfThePrice !== null && idOfThePrice !== undefined) {
        this.pricesToDelete.push(idOfThePrice);
      }
      this.getPrices().removeAt(i);
      this.priceImgPreviews.splice(i, 1);
    }
  }

}
