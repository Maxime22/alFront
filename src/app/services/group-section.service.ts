import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { GroupSection } from '../models/group-section.model';

@Injectable()
export class GroupSectionService {

  groupSectionSubject = new Subject<any[]>();
  oneGroupSectionSubject = new Subject<any>();

  private groupSections = [];

  constructor(private httpClient: HttpClient, private router: Router) {

  }

  emitGroupSectionSubject() {
    this.groupSectionSubject.next(this.groupSections.slice());
  }

  getGroupSectionById(id: string) {
    const groupSection = this.groupSections.find((groupSectionObject) => {
      return groupSectionObject._id === id;
    })
    return groupSection;
  }

  getGroupSectionByTitle(title: string) {
    const groupSection = this.groupSections.find((groupSectionObject) => {
      return groupSectionObject.title.toLowerCase() === title.toLowerCase();
    })
    return groupSection;
  }

  // NOT USED
  // getGroupSectionsTitles(){
  //   const arrayOfGroupSectionsTitles = [];
  //       this.groupSections.forEach(groupSection => {
  //           arrayOfGroupSectionsTitles.push(groupSection.title);
  //       });
  //       return arrayOfGroupSectionsTitles;
  // }

  getGroupSectionsFromServer() {
    let urlApi = '/alBack/groupSections';
    if (window.location.hostname === "localhost") {
      urlApi = 'http://localhost:3000' + urlApi;
    }
    return new Promise((resolve, reject) => {
      this.httpClient.get<any[]>(urlApi).subscribe(
        (response) => {
          this.groupSections = response;
          this.emitGroupSectionSubject();
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  addGroupSection(groupSection: GroupSection) {
    this.groupSections.push(groupSection);
    this.saveGroupSectionToServer(groupSection);
  }

  saveGroupSectionToServer(groupSection: GroupSection) {
    let urlApi = '/alBack/groupSections';
    if (window.location.hostname === "localhost") {
      urlApi = 'http://localhost:3000' + urlApi;
    }
    this.httpClient.post(urlApi, groupSection).subscribe(
      (resApi) => {
        // console.log(resApi['message'])
        this.router.navigate(['/admin/groupSectionList']);
      },
      (error) => {
        console.log('fail enregistrement ' + error)
      }
    )
  }

  deleteGroupSectionInServer(id: string) {
    let urlApi = '/alBack/groupSections/';
    if (window.location.hostname === "localhost") {
      urlApi = 'http://localhost:3000' + urlApi;
    }
    return new Promise((resolve, reject) => {
      this.httpClient.delete(urlApi + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  editGroupSectionToServer(id: string, groupSection: GroupSection) {
    let urlApi = '/alBack/groupSections/';
    if (window.location.hostname === "localhost") {
      urlApi = 'http://localhost:3000' + urlApi;
    }
    return new Promise((resolve, reject) => {
      this.httpClient.put(urlApi + id, groupSection).subscribe(
        (response) => {
          resolve(response['message']);
          this.router.navigate(['/admin/groupSectionList']);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getOneGroupSectionFromServerWithTitle(title: string) {
    let urlApi = '/alBack/groupSections/getOneGroupSectionWithTitle';
    if (window.location.hostname === "localhost") {
      urlApi = 'http://localhost:3000' + urlApi;
    }
    return new Promise((resolve, reject) => {
      this.httpClient.post<any>(urlApi, { title: title.toLowerCase() }).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}
