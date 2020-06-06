import { Component, OnInit } from '@angular/core';
import { SectionService } from '../services/section.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // sections: any[];
  // sectionSubscription: Subscription;

  sectionsTitles: string[];

  constructor(private sectionService: SectionService) { }

  ngOnInit() {
    this.sectionsTitles = this.sectionService.getSectionsTitles();
    // this.sectionSubscription = this.sectionService.sectionSubject.subscribe((sections: any[]) => {
    //   this.sections = sections;
    // });
    // this.sectionService.emitSectionSubject();
  }

}
