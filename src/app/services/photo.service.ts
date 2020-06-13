import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from '../models/photo.model';

@Injectable()
export class PhotoService {

    constructor(private httpClient: HttpClient, private router: Router) { }

    editPhotosOfASectionToServer(idSection: string, photos: Photo[]) {

        console.log("photos in photoserver ", photos);

        let photoData = new FormData();

        // WE TAKE THE VALUES BUT NOT THE FILES, THE FILES WILL BE SENT SEPARATELY
        let photosValuesToSend = [];
        let photosImgToSend = [];
        for (let index = 0; index < photos.length; index++) {
            photosValuesToSend.push(
                {
                    idForApiOrder:index,
                    photoTitle: photos[index]["photoTitle"],
                    typeOfPhoto: photos[index]["typeOfPhoto"],
                }
            )
            if (typeof photos[index]["photoImg"] === 'string') {
                photosValuesToSend[index]["imgUrl"] = photos[index]["photoImg"]
            } else {
                // AVEC CE CODE ON SAIT PAS QUELLE PHOTO CORRESPOND A QUEL ID POUR LE MULTER et le REQ.FILES QUI SUIT ?????????????????????????????????????????????????????????????
                // PAS SUR QUE LE MULTER RECOIVE BIEN PLUSIEURS FICHIERS NON PLUS
                // photoData.append('photos', photos[index]["photoImg"], photos[index]["photoTitle"]);
            }
        }

        photoData.append('photosValues', JSON.stringify(photosValuesToSend));

        // DOM ITERABLE : https://stackoverflow.com/questions/50677868/error-ts2339-property-entries-does-not-exist-on-type-formdata
        for (var pair of photoData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        return new Promise((resolve, reject) => {
            this.httpClient.put('http://localhost:3000/alBack/photos/sections/' + idSection, photoData).subscribe(
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