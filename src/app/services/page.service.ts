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

        let urlApi = '/alBack/pages';
        if (window.location.hostname === "localhost") {
            urlApi = 'http://localhost:3000' + urlApi;
        }

        return new Promise((resolve, reject) => {
            this.httpClient.post(urlApi, pageData).subscribe(
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

        let urlApi = '/alBack/pages/';
        if (window.location.hostname === "localhost") {
            urlApi = 'http://localhost:3000' + urlApi;
        }

        return new Promise((resolve, reject) => {
            this.httpClient.put(urlApi + id, pageData).subscribe(
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
        let urlApi = '/alBack/pages/getOnePageWithId';
        if (window.location.hostname === "localhost") {
            urlApi = 'http://localhost:3000' + urlApi;
        }
        return new Promise((resolve, reject) => {
            this.httpClient.post(urlApi, { id: id }).subscribe(
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
        let urlApi = "/alBack/pages/getOnePageWithTitle";
        if (window.location.hostname === "localhost") {
            urlApi = "http://localhost:3000" + urlApi;
        }
        console.log(window.location.hostname);
        return new Promise((resolve, reject) => {
            this.httpClient.post(urlApi, { title: title }).subscribe(
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
            this.httpClient.get<any[]>('alBack/pages').subscribe(
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