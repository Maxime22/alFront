export class Section {
    photos: any[]; // array of filenames
    orderPhotos: string; // type of template
    visible: boolean; // visible in the menu
    linkedTo: string; // linked to a groupSection
    displayOrderInMenu: number; // order in the menu
    constructor(public title: string, public content: string) {
    }
}