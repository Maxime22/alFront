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

    getSectionsTitles() {
        const arrayOfSectionsTitles = [];
        this.sections.forEach(section => {
            arrayOfSectionsTitles.push(section.title);
        });
        return arrayOfSectionsTitles;
    }

    getSectionByTitle(title: string) {
        const section = this.sections.find((sectionObject) => {
            return sectionObject.title.toLowerCase() === title.toLowerCase();
        }
        )
        if (section === undefined) {
            this.router.navigate(['/']);
        }
        return section;
    }

    getSectionById(id: number) {
        const section = this.sections.find((sectionObject) => {
            return sectionObject.id === id;
        }
        )
        if (section === undefined) {
            this.router.navigate(['/']);
        }
        return section;
    }

    addSection(section: Section) {
        this.sections.push(section);
        this.saveSectionToServer(section);
        this.emitSectionSubject();
    }

    saveSectionToServer(section: Section) {
        this.httpClient.post('http://localhost:3000/alBack/section', section).subscribe(
            (resApi) => {
                console.log(resApi['message'])
                this.emitSectionSubject();
            },
            (error) => {
                console.log('fail enregistrement ' + error)
            }
        )
    }

    getSectionsFromServer() {
        return new Promise((resolve, reject) => {
            this.httpClient.get<any[]>('http://localhost:3000/alBack/sections').subscribe(
                (response) => {
                    this.sections = response;
                    this.emitSectionSubject();
                    resolve(response);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }
}