import { Component, OnInit } from '@angular/core';
import { GroupSectionService } from '../../services/group-section.service';

@Component({
  selector: 'app-group-section-list',
  templateUrl: './group-section-list.component.html',
  styleUrls: ['./group-section-list.component.scss']
})
export class GroupSectionListComponent implements OnInit {

  groupSections: any;

  constructor(private groupSectionService: GroupSectionService) { }

  ngOnInit() {
    this.updateServerDatas();
  }

  onDelete(id){
    this.groupSectionService.deleteGroupSectionInServer(id);
    this.updateServerDatas();
  }

  updateServerDatas(){
    this.groupSectionService.getGroupSectionsFromServer().then(
      (groupSections) => {
        this.groupSections = groupSections;
    }
    );
  }

}
