import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../models/page.model';
import { Router } from '@angular/router';

@Injectable()
export class PageService {

    constructor(private httpClient: HttpClient, private router: Router) { }

    savePageToServer(page: Page, mainImg: File) {
        let pageData = new FormData();
        pageData.append('page', JSON.stringify(page));
        pageData.append('mainImg', mainImg, page.title);

        return new Promise((resolve, reject) => {
            this.httpClient.post('http://localhost:3000/alBack/pages', pageData).subscribe(
                (response) => {
                    this.router.navigate(['/admin/pageList']);
                    resolve(response);
                },
                (error) => {
                    console.log('fail enregistrement ' + error);
                    reject(error);
                }
            )
        });
    }

    editPageToServer(id: string, page: Page, mainImg: File | string) {
        let pageData: Page | FormData;
        if (typeof mainImg === 'string') {
            page.mainImgUrl = mainImg;
            pageData = page;
        } else {
            pageData = new FormData();
            pageData.append('page', JSON.stringify(page));
            pageData.append('mainImg', mainImg, page.title);
        }

        return new Promise((resolve, reject) => {
            this.httpClient.put('http://localhost:3000/alBack/pages/' + id, pageData).subscribe(
                (response) => {
                    this.router.navigate(['/admin/pageList']);
                    resolve(response);
                },
                (error) => {
                    console.log('fail enregistrement ' + error);
                    reject(error);
                }
            )
        });
    }

    getOnePageFromServer(id: string) {
        return new Promise((resolve, reject) => {
            this.httpClient.post('http://localhost:3000/alBack/pages/getOnePageWithId', { id: id }).subscribe(
                (response) => {
                    resolve(response);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    getOnePageFromServerWithTitle(title: string) {
        return new Promise((resolve, reject) => {
            this.httpClient.post('http://localhost:3000/alBack/pages/getOnePageWithTitle', { title: title }).subscribe(
                (response) => {
                    resolve(response);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    getPagesFromServer() {
        return new Promise((resolve, reject) => {
            this.httpClient.get<any[]>('http://localhost:3000/alBack/pages').subscribe(
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