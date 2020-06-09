import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupSectionService } from '../../services/group-section.service';
import { GroupSection } from '../../models/group-section.model';

@Component({
  selector: 'app-edit-group-section',
  templateUrl: './edit-group-section.component.html',
  styleUrls: ['./edit-group-section.component.scss']
})
export class EditGroupSectionComponent implements OnInit {

  groupSectionForm: FormGroup;
  groupSection: any;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private groupSectionService: GroupSectionService){

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.handleRouteChange(params));
  }

  handleRouteChange(params) {
    let id = params['id'];
    this.groupSection = this.groupSectionService.getGroupSectionById(id);
    this.initForm(this.groupSection);
  }

  initForm(groupSection) {
    this.groupSectionForm = this.formBuilder.group({
      title: [groupSection.title, Validators.required],
    });
  }

  onSubmitForm() {
    const formValue = this.groupSectionForm.value;
    const editedGroupSection = new GroupSection(
      formValue['title']
    );
    this.groupSectionService.editGroupSectionToServer(this.route.params['_value']['id'],editedGroupSection);
  }

}
