import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Cast } from 'src/app/interfaces/credits-response';
import Swiper, { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-cast-slideshow',
  templateUrl: './cast-slideshow.component.html',
  styleUrls: ['./cast-slideshow.component.css'],
})
export class CastSlideshowComponent implements OnInit {
  @Input() cast: Cast[] = [];

  ngOnInit(): void {}

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

  ngAfterViewInit(): void {
    const swiper = new Swiper('.swiper', {
      speed: 400,
      spaceBetween: 100,
    });
  }
}
