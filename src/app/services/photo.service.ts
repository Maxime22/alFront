import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from '../models/photo.model';

@Injectable()
export class PhotoService {

    constructor(private httpClient: HttpClient, private router: Router) { }

    editPhotosOfASectionToServer(idSection: string, photos: Photo[]) {

        console.log("photos ", photos);

        let photoData = new FormData();

        // photos.forEach(photo => {
        //     photoData.append('photo', JSON.stringify(photo));
        //     photoData.append('mainImg', mainImg, photo.title);
        // });

        return new Promise((resolve, reject) => {
            this.httpClient.put('http://localhost:3000/alBack/photos/' + idSection, photoData).subscribe(
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