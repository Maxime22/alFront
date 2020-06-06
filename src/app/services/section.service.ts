import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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

    addSection(title: string) {
        const sectionObject = {
            id: this.sections[this.sections.length - 1].id + 1,
            title: title
        };
        this.sections.push(sectionObject);
        this.emitSectionSubject();
    }

    saveSectionsToServer(title:string) {
        let section = this.getSectionByTitle(title);
        this.httpClient.post('http://localhost:3000/alBack/section', section).subscribe(
            (resApi) => {
                console.log(resApi['message'])
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