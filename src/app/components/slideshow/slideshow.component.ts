import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';

import { Swiper, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit, AfterViewInit {
  @Input() movies: Movie[] = [];
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    loop: true,
  };

  onSwiper(swiper: Event) {}
  onSlideChange() {}
  slideNext() {
    this.swiper?.swiperRef.slideNext();
  }
  slidePrev() {
    this.swiper?.swiperRef.slidePrev();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const swiper = new Swiper('.swiper', {
      speed: 400,
      spaceBetween: 100,
    });
  }
}
