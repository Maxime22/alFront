import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // IF I NEED EVERYTHING FROM THE SECTIONS IN HOME COMPONENT
  // sections: any[];
  // sectionSubscription: Subscription;
  
  constructor() { }

  // CALL THE ROUTE TO GET SECTIONS IN THE SERVICE AND, AFTER THE PROMISE IS DONE (SYNCHRONOUS), ADD ONLY THE TITLES IN HOME COMPONENT
  ngOnInit() {
    // IF I NEED EVERYTHING FROM THE SECTIONS IN HOME COMPONENT
    // this.sectionSubscription = this.sectionService.sectionSubject.subscribe((sections: any[]) => {
    //   this.sections = sections;
    // });
    // this.sectionService.emitSectionSubject();
  }

}
