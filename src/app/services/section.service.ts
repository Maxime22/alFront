import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class SectionService {

    sectionSubject = new Subject<any[]>();

    private sections = [{
        id: 1,
        title: "Mariage"
    },
    {
        id: 2,
        title: "Portrait"
    },
    {
        id: 3,
        title: "Couple"
    },
    {
        id: 2,
        title: "Grossesse"
    }];

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

    saveSectionsToServer() {
        this.httpClient.put('https://test-firebase-al.firebaseio.com/appareils.json', this.sections).subscribe(
            () => {
                console.log('enregistrement effectué')
            },
            (error) => {
                console.log('fail enregistrement ' + error)
            }
        )
    }

    getSectionsFromServer() {
        this.httpClient.get<any[]>('https://test-firebase-al.firebaseio.com/appareils.json').subscribe(
            (response) => {
                this.sections = response;
                this.emitSectionSubject();
            },
            (error) => {
                console.log('fail récupération ' + error)
            }
        )
    }
}