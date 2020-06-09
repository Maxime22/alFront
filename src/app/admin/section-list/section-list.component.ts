import { Component, OnInit } from '@angular/core';
import { SectionService } from '../../services/section.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.scss']
})
export class SectionListComponent implements OnInit {

  sections: any;
  // sectionSubscription: Subscription;

  sectionsTitles: string[];
  
  constructor(private sectionService: SectionService) { }

  ngOnInit() {
    this.updateServerDatas();
  }

  onDelete(id){
    this.sectionService.deleteSectionInServer(id);
    this.updateServerDatas();
  }

  updateServerDatas(){
    this.sectionService.getSectionsFromServer().then(
      (sections) => {
        this.sections = sections;
    }
    );
  }

  // this.sectionSubscription = this.sectionService.sectionSubject.subscribe((sections: any[]) => {
        //   this.sections = sections;
        // });
        // this.sectionService.emitSectionSubject();

}
