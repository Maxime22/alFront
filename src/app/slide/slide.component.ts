import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { reduce } from 'rxjs/operators';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  animations: [
    trigger('changeOpacity', [
      state('initial', style({
        backgroundColor: "red",
        opacity: 1,
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)'
      })),
      state('final', style({
        backgroundColor: "green",
        opacity: 0,
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)'
      })),
      transition('initial=>final', animate('1500ms')),
      transition('final=>initial', animate('1000ms'))
    ]),
  ]
})
export class SlideComponent implements OnInit {

  @Input() listImages: [];
  @Input() imageSelected: number;
  image1: any;
  image2: any;
  currentState1 = 'initial';
  currentState2 = 'final';
  isActualImage: any;

  constructor() { }

  ngOnInit(): void {
    this.image1 = this.listImages[this.imageSelected];
    this.image2 = this.listImages[this.imageSelected-1]; // NOT REALLY IMPORTANT THE VALUE IN IMAGE 2 BECAUSE WE DON'T SEE IT
    this.isActualImage = this.listImages[this.imageSelected];
  }

  changeState() {
    this.currentState1 = this.currentState1 === 'initial' ? 'final' : 'initial';
    this.currentState2 = this.currentState2 === 'initial' ? 'final' : 'initial';
  }

  onNext() {
    if (this.imageSelected === this.listImages.length - 1) {
      this.imageSelected = 0;
    } else {
      this.imageSelected++;
    }
    if (this.isActualImage === this.image1) {
      this.image2 = this.listImages[this.imageSelected];
      this.isActualImage = this.listImages[this.imageSelected];
    } else {
      this.image1 = this.listImages[this.imageSelected];
      this.isActualImage = this.listImages[this.imageSelected];
    }
    this.changeState();
  }

  onPrevious() {
    if (this.imageSelected === 0) {
      this.imageSelected = this.listImages.length - 1;
    } else {
      this.imageSelected--;
    }
    if (this.isActualImage === this.image1) {
      this.image2 = this.listImages[this.imageSelected];
      this.isActualImage = this.listImages[this.imageSelected];
    } else {
      this.image1 = this.listImages[this.imageSelected];
      this.isActualImage = this.listImages[this.imageSelected];
    }
    this.changeState();
  }

}
