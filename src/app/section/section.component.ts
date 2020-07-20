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
      transition('initial=>final', animate('1000ms 500ms')),
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
  alreadyInSection: boolean;

  constructor(private sectionService: SectionService, private photoService: PhotoService, private route: ActivatedRoute, private routeHistory: RouteHistory) { }

  // https://www.it-swarm.dev/fr/angular/angular-4-composant-ngoninit-non-appele-chaque-demande-de-route/832647952/
  // https://blog.hackages.io/our-solution-to-get-a-previous-route-with-angular-5-601c16621cf0
  ngOnInit(): void {
    this.route.params.subscribe(params => this.handleRouteChange(params));
  }

  handleRouteChange(params) {
    // Masonry bugs with top for images so i reload the entire component to reload also masonry (i didn't succeed to change only the ngx masonry component, reload items items doesn't work all the time, notably the first time we come from the same component (url))
    if (this.alreadyInSection === true) {
      location.reload();
    }
    this.showSlide = false;
    this.currentState = 'initial';
    this.sectionService.getOneSectionFromServer(params['sectionTitle']).then(
      (response) => {
        this.section = response;
        this.photoService.getPhotosOfASectionFromServer(response["_id"]).then((res: any) => {
          let photosInOrder = res.photos;
          photosInOrder.sort(function (a, b) {
            return Number(a.orderInPhotos) - Number(b.orderInPhotos);
          });
          this.photosInTheSection = photosInOrder;
          // If there are photos
          if (photosInOrder.length > 0) {
            let firstImgId = photosInOrder[0]._id;
            let img = null;
            let intr = setInterval(() => {
              if (img === null) {
                img = document.getElementById(firstImgId) as HTMLImageElement;
              }
              if (this.masonry && img !== null && img.complete) {
                // The first time we arrive on the page we don't want to reload the items
                // if (this.alreadyInSection) {
                //   // Reload items
                //   this.masonry.reloadItems(); // when it is not here for the first time, the images are loading hazardly but not with spaces...
                //   // Display items
                //   this.masonry.layout();
                //   // Loading disappears
                //   this.changeState();
                // } else {
                this.changeState();
                // }
                setTimeout(() => {
                  this.alreadyInSection = true;
                }, 1500);
                // Leaves the interval
                clearInterval(intr);
              } else if (this.innerWidthMobile && img !== null && img.complete) {
                // Loading disappears
                this.changeState();
                setTimeout(() => {
                  this.alreadyInSection = true;
                }, 1500);
                clearInterval(intr);
              }
            }, 1000)
          } else {
            this.changeState();
          }
        })
      });
    if (window.innerWidth > 845) {
      this.innerWidthMobile = false;
    } else {
      this.innerWidthMobile = true;
    }
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
