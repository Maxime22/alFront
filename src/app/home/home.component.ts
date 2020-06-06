import { Component, OnInit } from '@angular/core';
import { SectionService } from '../services/section.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // IF I NEED EVERYTHING FROM THE SECTIONS IN HOME COMPONENT
  // sections: any[];
  // sectionSubscription: Subscription;

  sectionsTitles: string[];
  
  constructor(private sectionService: SectionService) { }

  // CALL THE ROUTE TO GET SECTIONS IN THE SERVICE AND, AFTER THE PROMISE IS DONE (SYNCHRONOUS), ADD ONLY THE TITLES IN HOME COMPONENT
  ngOnInit() {
    this.sectionService.getSectionsFromServer().then(
      () => {
        this.sectionsTitles = this.sectionService.getSectionsTitles();
    }
    );
  
    // IF I NEED EVERYTHING FROM THE SECTIONS IN HOME COMPONENT
    // this.sectionSubscription = this.sectionService.sectionSubject.subscribe((sections: any[]) => {
    //   this.sections = sections;
    // });
    // this.sectionService.emitSectionSubject();
  }

  onSend(title:string){
    this.sectionService.saveSectionsToServer(title);
  }

}
