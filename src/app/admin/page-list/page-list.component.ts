import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {

  pages: any;

  constructor(private pageService: PageService) { }

  ngOnInit() {
    this.updateServerDatas();
  }

  updateServerDatas() {
    this.pageService.getPagesFromServer().then(
      (pages) => {
        this.pages = pages;
      }
    );
  }

}
