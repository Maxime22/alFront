import { Photo } from './photo.model';

export class Section {
    photos: Photo[]; // array of object Photos ? ou il faut le définir autrement ?
    templatePhotos: string; // type of template, we will do it when we do the FRONT
    orderInHeaderMenu: number; // order in the menu
    mainImgUrl: string; // img used in the groupSections
    constructor(public title: string, public content: string, public isVisibleInMenu: boolean) {
    }
}