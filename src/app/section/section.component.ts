import { Component, OnInit, OnChanges } from '@angular/core';
import { SectionService } from '../services/section.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  section: any;

  constructor(private sectionService: SectionService, private route: ActivatedRoute, private router: Router) { }

  // https://www.it-swarm.dev/fr/angular/angular-4-composant-ngoninit-non-appele-chaque-demande-de-route/832647952/
  // route seems to be an observable
  ngOnInit(): void {
    this.route.params.subscribe(params => this.handleRouteChange(params));
  }

  handleRouteChange(params) {
    const titleUrl = params['sectionTitle'];
    this.section = this.sectionService.getSectionByTitle(titleUrl);
  }

}
