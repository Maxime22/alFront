import { Component, OnInit } from '@angular/core';
import { SectionService } from '../services/section.service';
import { ActivatedRoute } from '@angular/router';
import { RouteHistory } from '../services/routeHistory.service';
import { PhotoService } from '../services/photo.service';
import { NgxMasonryModule } from 'ngx-masonry';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {

  section: any;
  loading: boolean;
  photosInTheSection: any;
  showSlide: boolean;
  imageSelected: number;
  innerWidthMobile: boolean;

  constructor(private sectionService: SectionService, private photoService: PhotoService, private route: ActivatedRoute, private routeHistory: RouteHistory) { }

  // https://www.it-swarm.dev/fr/angular/angular-4-composant-ngoninit-non-appele-chaque-demande-de-route/832647952/
  // https://blog.hackages.io/our-solution-to-get-a-previous-route-with-angular-5-601c16621cf0
  ngOnInit(): void {
    if (this.route.snapshot.params['sectionTitle'] === "portrait" && this.routeHistory.getPreviousUrl() === "/") {
      this.loading = true;
    } else if (this.route.snapshot.params['sectionTitle'] !== "portrait" && !this.routeHistory.getPreviousUrl().includes('section/')) {
      this.loading = true;
    }
    this.route.params.subscribe(params => this.handleRouteChange(params));
    this.showSlide = false;
    if(window.innerWidth > 845){
      this.innerWidthMobile = false;
    }else{
      this.innerWidthMobile = true;
    }
  }

  handleRouteChange(params) {
    this.sectionService.getOneSectionFromServer(params['sectionTitle']).then(
      (response) => {
        this.section = response;
        setTimeout(() => {
          this.loading = false;
        }, 3000)
        this.photoService.getPhotosOfASectionFromServer(response["_id"]).then((response: any) => {
          let photosInOrder = response.photos;
          photosInOrder.sort(function (a, b) {
            return Number(a.orderInPhotos) - Number(b.orderInPhotos);
          });
          this.photosInTheSection = photosInOrder;
        })
      });
  }

  onShowSlide(i){
    this.showSlide = true;
    this.imageSelected = i;
  }

  onExitSlide() {
    this.showSlide = false;
  }

  onResize(event) {
    if(event.target.innerWidth > 845){
      this.innerWidthMobile = false;
    }else{
      this.innerWidthMobile = true;
    }
  }

}
