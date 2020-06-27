import { Component, OnInit } from '@angular/core';
import { SectionService } from '../services/section.service';
import { GroupSectionService } from '../services/group-section.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-group-section',
  templateUrl: './group-section.component.html',
  styleUrls: ['./group-section.component.scss'],
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
      transition('initial=>final', animate('1500ms')),
      transition('final=>initial', animate('1000ms'))
    ]),
  ]
})
export class GroupSectionComponent implements OnInit {

  sections: any;
  groupSections: any;
  groupSection: any;
  groupSectionSubscription: Subscription;
  currentState = 'initial';

  constructor(private sectionService: SectionService, private groupSectionService: GroupSectionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.handleRouteChange(params));
  }

  handleRouteChange(params) {
    this.groupSectionService.getOneGroupSectionFromServerWithTitle(params['groupSectionTitle']).then(
      (response) => {
        this.changeState();
        this.groupSection = response;
        this.sectionService.getSeveralSectionsFromServer(response['sectionsIds']).then(
          (response) => {
            this.sections = response;
          });
      });
  }

  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

}
