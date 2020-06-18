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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.handleRouteChange(params));
  }

  handleRouteChange(params) {
    if(this.route.snapshot.routeConfig.path === "section/:sectionTitle"){
      this.isASection = true;
    }
    if(this.route.snapshot.routeConfig.path === "groupSection/:groupSectionTitle"){
      this.isAGroupSection = true;
    }
  }

}
