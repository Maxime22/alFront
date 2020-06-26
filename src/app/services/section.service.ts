import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Section } from '../models/section.model';

@Injectable()
export class SectionService {

    sectionSubject = new Subject<any[]>();

    private sections = [];

    constructor(private httpClient: HttpClient, private router: Router) { }

    emitSectionSubject() {
        this.sectionSubject.next(this.sections.slice());
    }

    // NOT USED
    // getSectionsTitles() {
    //     const arrayOfSectionsTitles = [];
    //     this.sections.forEach(section => {
    //         arrayOfSectionsTitles.push(section.title);
    //     });
    //     return arrayOfSectionsTitles;
    // }

    getSectionByTitle(title: string) {
        const section = this.sections.find((sectionObject) => {
            return sectionObject.title.toLowerCase() === title.toLowerCase();
        }
        )
        return section;
    }

    getSectionById(id: string) {
        const section = this.sections.find((sectionObject) => {
            return sectionObject._id === id;
        }
        )
        return section;
    }

    addSection(section: Section) {
        this.sections.push(section);
        this.saveSectionToServer(section);
    }

    saveSectionToServer(section: Section) {
        let urlApi = '/alBack/sections';
        if (window.location.hostname === "localhost") {
            urlApi = 'http://localhost:3000' + urlApi;
        }
        this.httpClient.post(urlApi, section).subscribe(
            (resApi) => {
                // console.log(resApi['message'])
                this.router.navigate(['/admin/sectionList']);
            },
            (error) => {
                console.log('fail enregistrement ' + error)
            }
        )
    }

    editSectionToServer(id: string, section: Section, mainImg: File | string) {
        let sectionData: Section | FormData;
        if (typeof mainImg === 'string') {
            section.mainImgUrl = mainImg;
            sectionData = section;
        } else {
            sectionData = new FormData();
            sectionData.append('section', JSON.stringify(section));
            // HERE THE MAINIMG WILL HAVE THE TITLE OF THE SECTION
            sectionData.append('mainImg', mainImg, section.title);
        }

        let urlApi = '/alBack/sections/';
        if (window.location.hostname === "localhost") {
            urlApi = 'http://localhost:3000' + urlApi;
        }
        return new Promise((resolve, reject) => {
            this.httpClient.put(urlApi + id, sectionData).subscribe(
                (response) => {
                    resolve(response['message']);
                    // this.emitSectionSubject();
                    this.router.navigate(['/admin/sectionList']);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    deleteSectionInServer(id: string) {
        let urlApi = '/alBack/sections/';
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

    getSectionsFromServer() {
        let urlApi = '/alBack/sections';
        if (window.location.hostname === "localhost") {
            urlApi = 'http://localhost:3000' + urlApi;
        }
        return new Promise((resolve, reject) => {
            this.httpClient.get<any[]>(urlApi).subscribe(
                (response) => {
                    this.sections = response;
                    // this.emitSectionSubject();
                    resolve(response);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    getOneSectionFromServer(title: string) {
        let urlApi = '/alBack/sections/getOneSectionWithTitle';
        if (window.location.hostname === "localhost") {
            urlApi = 'http://localhost:3000' + urlApi;
        }
        return new Promise((resolve, reject) => {
            this.httpClient.post(urlApi, { title: title.toLowerCase() }).subscribe(
                (response) => {
                    resolve(response);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    // NOT SURE
    getSeveralSectionsFromServer(sectionsIds: []) {
        let urlApi = '/alBack/sections/severalSections';
        if (window.location.hostname === "localhost") {
            urlApi = 'http://localhost:3000' + urlApi;
        }
        return new Promise((resolve, reject) => {
            this.httpClient.post<any[]>(urlApi, { sectionsIds: sectionsIds }).subscribe(
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