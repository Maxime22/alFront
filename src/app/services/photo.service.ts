import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '../models/photo.model';

@Injectable()
export class PhotoService {

    constructor(private httpClient: HttpClient) { }

    editPhotosOfASectionToServer(sectionId: string, photos: Photo[]) {

        let photoData = new FormData();

        let photosValuesToSend = [];
        for (let index = 0; index < photos.length; index++) {
            let filename = photos[index]["photoTitle"].split(' ').join('_');
            photosValuesToSend.push(
                {
                    filename: filename,
                    photoTitle: photos[index]["photoTitle"],
                    typeOfPhoto: photos[index]["typeOfPhoto"],
                    orderInPhotos: photos[index]["orderInPhotos"],
                    sectionId:sectionId
                }
            )
            if(photos[index]["photoId"] !== null && photos[index]["photoId"] !== undefined){
                photosValuesToSend[index]["_id"] = photos[index]["photoId"];
            }
            // IF PHOTOIMG IS AN URL WE PUT THE URL IN THE OBJECT TO SAVE
            if (typeof photos[index]["photoImg"] === 'string') {
                photosValuesToSend[index]["photoImgUrl"] = photos[index]["photoImg"]
            } else {
                let file = photos[index]["photoImg"];
                photoData.append('photos', file, filename);
            }
        }

        photoData.append('photosValues', JSON.stringify(photosValuesToSend));

        // DOM ITERABLE : https://stackoverflow.com/questions/50677868/error-ts2339-property-entries-does-not-exist-on-type-formdata
        // for (var pair of photoData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }

        return new Promise((resolve, reject) => {
            this.httpClient.put('http://localhost:3000/alBack/photos/sections/' + sectionId, photoData).subscribe(
                (response) => {
                    resolve(response);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    getPhotosOfASectionFromServer(sectionId: string){
        return new Promise((resolve, reject) => {
            this.httpClient.get('http://localhost:3000/alBack/photos/sections/' + sectionId).subscribe(
                (response) => {
                    resolve(response);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    deletePhotosOfASectionToServer(photosToDelete: string[]){
        return new Promise((resolve, reject) => {
            this.httpClient.post('http://localhost:3000/alBack/photos/deletePhotos', photosToDelete).subscribe(
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