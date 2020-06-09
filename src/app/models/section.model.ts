import { Photo } from './photo.model';

export class Section {
    photos: Photo[]; // array of object Photos ? ou il faut le définir autrement ?
    orderPhotos: string; // type of template
    visible: boolean; // visible in the menu
    linkedTo: string; // linked to a groupSection
    displayOrderInMenu: number; // order in the menu
    constructor(public title: string, public content: string) {
    }
}