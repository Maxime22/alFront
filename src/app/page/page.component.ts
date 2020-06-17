import { Component, OnInit } from '@angular/core';
import { PageService } from '../services/page.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  page: any;

  constructor(private pageService: PageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
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
          });
      } else {
        this.pageService.getOnePageFromServerWithTitle(pathOfRoute).then(
          (response) => {
            this.page = response;
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
    }else{
      return false;
    }
  }

}
