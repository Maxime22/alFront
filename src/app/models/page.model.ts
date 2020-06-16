export class Page {
    mainImgUrl: string; // used to make something not ugly and having the possibility to change it
    typeOfTemplate: string;
    constructor(public title: string, public content: string) {
    }
}