export class Section {
    photos: any[];
    orderPhotos: string;
    visible: boolean;
    linkedTo: string;
    constructor(public title: string, public author: string, public content: string) {
    }
}