import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LanguageService } from 'src/app/shared/service/language.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { SliderService } from 'src/app/slider/slider.service';

@Component({
 selector: 'app-info-graphic',
 templateUrl: './info-graphic.component.html',
 styleUrls: ['./info-graphic.component.scss'],
})
export class InfoGraphicComponent implements OnInit {
 imgCollection: any;
 _albums: any[] = [];
 site: any;
 lang: any;
 slidelist: any;
 siteinfo: any;
 listcount = 0;
 slidelist1: any;
 listcount1 = 0;
 constructor(
  private _lightbox: Lightbox,
  private slideService: SliderService,
  private loaderService: LoaderService,
  private language: LanguageService
 ) {}

 ngOnInit(): void {
  for (let i = 1; i <= 10; i++) {
   const src = 'http://www.frc.mn/resource/frc/image/2022/02/17/m8miyy6q2t8f4j9x/photo_2022-02-17_10-58-23.jpg';
   // const caption = 'Image ' + i + ' caption here';
   const thumb = 'http://www.frc.mn/resource/frc/image/2022/02/17/m8miyy6q2t8f4j9x/photo_2022-02-17_10-58-23.jpg';
   const album = {
    src: src,
    caption: '',
    thumb: thumb,
   };
   this._albums.push(album);
  }
  this.language.setLanguage();
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
  });

  this.loadSlide();
  this.loadSlide1();
 }

 loadSlide() {
  // this.loaderService.show('');
  this.slideService.slidelist(this.siteinfo, 'infograp', 'active').subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.slidelist = result;
    this.listcount = this.slidelist.length;
    // console.log(this.slidelist);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 loadSlide1() {
  // this.loaderService.show('');
  this.slideService.slidelist(this.siteinfo, 'picture', 'active').subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.slidelist1 = result;
    this.listcount1 = this.slidelist1.length;
    // console.log(this.slidelist);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 open(index: number): void {
  // open lightbox
  this._lightbox.open(this._albums, index);
 }

 close(): void {
  this._lightbox.close();
 }

 customOptions: OwlOptions = {
  loop: true,
  items: 1,
  stagePadding: 0,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  autoplay: false,
  nav: true,
  margin: 20,
  navSpeed: 1000,
  navText: ['<i class="carousel-control-prev-icon icon-size"></i>', '<i class="carousel-control-next-icon icon-size"></i>'],
  responsive: {
   0: {
    items: 1,
   },
   400: {
    items: 2,
   },
   740: {
    items: 3,
   },
   940: {
    items: 4,
   },
   1000: {
    items: 4,
   },
  },
 };
}
