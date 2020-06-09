import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupSectionService } from '../../services/group-section.service';
import { GroupSection } from '../../models/group-section.model';
import { SectionService } from '../../services/section.service';

@Component({
  selector: 'app-edit-group-section',
  templateUrl: './edit-group-section.component.html',
  styleUrls: ['./edit-group-section.component.scss']
})
export class EditGroupSectionComponent implements OnInit {

  groupSectionForm: FormGroup;
  groupSection: any;
  sections: any;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private groupSectionService: GroupSectionService, private sectionService: SectionService){

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.handleRouteChange(params));
  }

  handleRouteChange(params) {
    let id = params['id'];
    this.groupSection = this.groupSectionService.getGroupSectionById(id);
    this.updateServerDatas();
    this.initForm(this.groupSection);
  }

  updateServerDatas(){
    this.sectionService.getSectionsFromServer().then(
      (sections) => {
        this.sections = sections;
    }
    );
  }

  initForm(groupSection) {
    this.groupSectionForm = this.formBuilder.group({
      title: [groupSection.title, Validators.required],
      sectionsIds:[groupSection.sectionsIds, Validators.required],
    });
  }

  onSubmitForm() {
    // the datas are in the order of the parameters in the model
    const formValue = this.groupSectionForm.value;
    const editedGroupSection = new GroupSection(
      formValue['title'].toLowerCase(),formValue['sectionsIds']
    );
    this.groupSectionService.editGroupSectionToServer(this.route.params['_value']['id'],editedGroupSection);
  }

}
