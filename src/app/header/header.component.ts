import { Component, Input, OnInit } from '@angular/core';
import { SectionService } from '../services/section.service';
import { GroupSectionService } from '../services/group-section.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // @Input() sectionsTitles: Array<String>;
  sectionsTitles: string[];
  groupSectionsTitles: string[];

  constructor(private sectionService: SectionService, private groupSectionService: GroupSectionService) { }

  ngOnInit(): void {
    this.sectionService.getSectionsFromServer().then(
      () => {
        this.sectionsTitles = this.sectionService.getSectionsTitles();
    });
    this.groupSectionService.getGroupSectionsFromServer().then(
      () => {
        this.groupSectionsTitles = this.groupSectionService.getGroupSectionsTitles();
    });
  }

}
