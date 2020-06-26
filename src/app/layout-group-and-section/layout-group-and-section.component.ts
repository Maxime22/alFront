import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout-group-and-section',
  templateUrl: './layout-group-and-section.component.html',
  styleUrls: ['./layout-group-and-section.component.scss']
})
export class LayoutGroupAndSectionComponent implements OnInit {

  isASection:boolean;
  isAGroupSection:boolean;
  pageScroll: number;
  displayButtonScroll: boolean;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.displayButtonScroll = false;
    this.route.params.subscribe(params => this.handleRouteChange(params));
  }

  handleRouteChange(params) {
    this.onScroll('');
    if(this.route.snapshot.routeConfig.path === "section/:sectionTitle"){
      this.isASection = true;
    }
    if(this.route.snapshot.routeConfig.path === "groupSection/:groupSectionTitle"){
      this.isAGroupSection = true;
    }
  }

  scrollToElement($element) {
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
  onScroll(event) {
    this.pageScroll = window.pageYOffset;
    if (this.pageScroll > 300 && event.target.innerWidth > 845) {
      this.displayButtonScroll = true;
    } else {
      this.displayButtonScroll = false;
    }
  }

  onResize(event) {
    if (event.target.innerWidth > 845) {
      this.displayButtonScroll = true;
    } else {
      this.displayButtonScroll = false;
    }
  }

}
