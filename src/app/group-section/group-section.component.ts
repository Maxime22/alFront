import { Component, OnInit } from '@angular/core';
import { SectionService } from '../services/section.service';
import { GroupSectionService } from '../services/group-section.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group-section',
  templateUrl: './group-section.component.html',
  styleUrls: ['./group-section.component.scss']
})
export class GroupSectionComponent implements OnInit {

  sections: any;
  groupSections: any;
  groupSection: any;
  groupSectionSubscription: Subscription;
  loading: boolean;

  constructor(private sectionService: SectionService, private groupSectionService: GroupSectionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => this.handleRouteChange(params));
  }

  handleRouteChange(params) {
    this.groupSectionService.getOneGroupSectionFromServerWithTitle(params['groupSectionTitle']).then(
      (response) => {
        // we can put the settimeout here because it is asynchronous
        setTimeout(() => {
          this.loading = false;
        }, 3000)
        this.groupSection = response;
        this.sectionService.getSeveralSectionsFromServer(response['sectionsIds']).then(
          (response) => {
            this.sections = response;
          });
      });



  }

}
