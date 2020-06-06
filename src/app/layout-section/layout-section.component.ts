import { Component, OnInit } from '@angular/core';
import { SectionService } from '../services/section.service';

@Component({
  selector: 'app-layout-section',
  templateUrl: './layout-section.component.html',
  styleUrls: ['./layout-section.component.scss']
})
export class LayoutSectionComponent implements OnInit {

  sectionsTitles: string[];

  constructor(private sectionService: SectionService) { }

  ngOnInit() {
    this.sectionsTitles = this.sectionService.getSectionsTitles();
  }

}
