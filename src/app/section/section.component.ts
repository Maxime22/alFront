import { Component, OnInit, ViewChild } from '@angular/core';
import { SectionService } from '../services/section.service';
import { ActivatedRoute } from '@angular/router';
import { RouteHistory } from '../services/routeHistory.service';
import { PhotoService } from '../services/photo.service';
import LazyLoad from "vanilla-lazyload";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgxMasonryComponent } from 'ngx-masonry';

let lazyLoadInstance = new LazyLoad({
  elements_selector: ".lazy"
});

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
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
      transition('initial=>final', animate('2000ms 1500ms')),
    ]),
  ]
})
export class SectionComponent implements OnInit {

  section: any;
  photosInTheSection: any;
  showSlide: boolean;
  imageSelected: number;
  innerWidthMobile: boolean;
  currentState: string;
  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;

  constructor(private sectionService: SectionService, private photoService: PhotoService, private route: ActivatedRoute, private routeHistory: RouteHistory) { }

  // https://www.it-swarm.dev/fr/angular/angular-4-composant-ngoninit-non-appele-chaque-demande-de-route/832647952/
  // https://blog.hackages.io/our-solution-to-get-a-previous-route-with-angular-5-601c16621cf0
  ngOnInit(): void {
    // if (this.route.snapshot.params['sectionTitle'] === "portrait" && this.routeHistory.getPreviousUrl() === "/") {
    //   this.currentState = 'final';
    // } else if (this.route.snapshot.params['sectionTitle'] !== "portrait" && !this.routeHistory.getPreviousUrl().includes('section/')) {
    //   this.currentState = 'final';
    // }
    this.route.params.subscribe(params => this.handleRouteChange(params));
  }

  handleRouteChange(params) {
    this.showSlide = false;
    this.currentState = 'initial';
    this.sectionService.getOneSectionFromServer(params['sectionTitle']).then(
      (response) => {
        this.section = response;
        this.photoService.getPhotosOfASectionFromServer(response["_id"]).then((res: any) => {
          this.changeState();
          let photosInOrder = res.photos;
          photosInOrder.sort(function (a, b) {
            return Number(a.orderInPhotos) - Number(b.orderInPhotos);
          });
          this.photosInTheSection = photosInOrder;
        })
      });
    if (window.innerWidth > 845) {
      this.innerWidthMobile = false;
    } else {
      this.innerWidthMobile = true;
    }
    setTimeout(() => {
      if (this.masonry) {
        this.masonry.reloadItems();
        this.masonry.layout();
      }
    }, 800);
  }

  onShowSlide(i) {
    if (!this.innerWidthMobile) {
      this.showSlide = true;
    }
    this.imageSelected = i;
  }

  onExitSlide() {
    this.showSlide = false;
  }

  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

}
