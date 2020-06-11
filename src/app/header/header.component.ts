import { Component, Input, OnInit } from '@angular/core';
import { SectionService } from '../services/section.service';
import { GroupSectionService } from '../services/group-section.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  sections: any;
  groupSections: any;

  constructor(private sectionService: SectionService, private groupSectionService: GroupSectionService) { }

  ngOnInit(): void {
    this.sectionService.getSectionsFromServer().then(
      (response) => {
        this.sections = response;
    });
    this.groupSectionService.getGroupSectionsFromServer().then(
      (response) => {
        this.groupSections = response;
    });
  }

}
