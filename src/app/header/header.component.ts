import { Component, OnInit, OnDestroy } from '@angular/core';
import { SectionService } from '../services/section.service';
import { GroupSectionService } from '../services/group-section.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  sections: any;
  groupSections: any;

  isAuth: boolean;
  private isAuthSub: Subscription;

  constructor(private sectionService: SectionService, private groupSectionService: GroupSectionService, private authService: AuthService, private router: Router) { }

  // DON'T KNOW WHY BUT THIS ONE IS RECALLED BETWEEN section/:sectionTitle and groupSection/:groupSectionTitle
  ngOnInit(): void {
    this.sectionService.getSectionsFromServer().then(
      (response: any) => {
        let sectionsInOrder = response;
        // a and b are elements, the function sort orders by a parameter
        sectionsInOrder.sort(function (a, b) {
          return Number(a.orderInHeaderMenu) - Number(b.orderInHeaderMenu);
        });
        this.sections = sectionsInOrder;
      });
    this.groupSectionService.getGroupSectionsFromServer().then(
      (response) => {
        this.groupSections = response;
      });
    this.isAuthSub = this.authService.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }

  ngOnDestroy() {
    this.isAuthSub.unsubscribe();
  }
}
