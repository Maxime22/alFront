import { Component, OnInit, OnChanges } from '@angular/core';
import { SectionService } from '../services/section.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  section: any;
  sectionSubscription: Subscription;

  constructor(private sectionService: SectionService, private route: ActivatedRoute) { }

  // https://www.it-swarm.dev/fr/angular/angular-4-composant-ngoninit-non-appele-chaque-demande-de-route/832647952/
  ngOnInit(): void {
    this.route.params.subscribe(params => this.handleRouteChange(params));
  }

  handleRouteChange(params) {
    this.sectionService.getOneSectionFromServer(params['sectionTitle']).then(
      (response) => {
          this.section = response;
      });
  }

}
