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
        this.httpClient.post('http://localhost:3000/alBack/sections', section).subscribe(
            (resApi) => {
                // console.log(resApi['message'])
                this.router.navigate(['/admin/sectionList']);
            },
            (error) => {
                console.log('fail enregistrement ' + error)
            }
        )
    }

    editSectionToServer(id: string, section: Section) {
        return new Promise((resolve, reject) => {
            this.httpClient.put('http://localhost:3000/alBack/sections/' + id, section).subscribe(
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

    // modifyThingWithFile(id: string, thing: Thing, image: File | string) {
    //     return new Promise((resolve, reject) => {
    //         let thingData: Thing | FormData;
    //         if (typeof image === 'string') {
    //             thing.imageUrl = image;
    //             thingData = thing;
    //         } else {
    //             thingData = new FormData();
    //             thingData.append('thing', JSON.stringify(thing));
    //             thingData.append('image', image, thing.title);
    //         }
    //         this.http.put('http://localhost:3000/api/stuff/' + id, thingData).subscribe(
    //             (response) => {
    //                 resolve(response);
    //             },
    //             (error) => {
    //                 reject(error);
    //             }
    //         );
    //     });
    // }

    deleteSectionInServer(id: string) {
        return new Promise((resolve, reject) => {
            this.httpClient.delete('http://localhost:3000/alBack/sections/' + id).subscribe(
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
        return new Promise((resolve, reject) => {
            this.httpClient.get<any[]>('http://localhost:3000/alBack/sections').subscribe(
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
        return new Promise((resolve, reject) => {
            this.httpClient.post('http://localhost:3000/alBack/sections/getOneSectionWithTitle', {title:title.toLowerCase()}).subscribe(
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
        return new Promise((resolve, reject) => {
            this.httpClient.post<any[]>('http://localhost:3000/alBack/sections/severalSections', {sectionsIds:sectionsIds}).subscribe(
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