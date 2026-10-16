import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LanguageService } from 'src/app/shared/service/language.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { SliderService } from 'src/app/slider/slider.service';

@Component({
 selector: 'app-pointer-container',
 templateUrl: './pointer-container.component.html',
 styleUrls: ['./pointer-container.component.scss'],
})
export class PointerContainerComponent implements OnInit {
 site: any = 'main';
 lang: any = 'mn';
 slidelist: any;
 siteinfo: any;
 loadcount = 0;
 listcount = 0;
 constructor(private slideService: SliderService, private loaderService: LoaderService, private language: LanguageService) {}

 ngOnInit(): void {
  this.language.setLanguage();
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
  });
  this.loadSlide();
 }

 loadSlide() {
  // this.loaderService.show('');
  this.slideService.slidelist(this.siteinfo, 'pointer', 'active').subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.slidelist = JSON.parse(JSON.stringify(result)).sort((a: { ids: number }, b: { ids: number }) =>
     a.ids !== b.ids ? (a.ids < b.ids ? -1 : 1) : 0
    );
    this.listcount = this.slidelist.length;
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 getUrl(url: any) {
  return encodeURI(url.replace('\\', '/'));
 }

 onResize(event: any) {
  //   console.log(event);
 }

 customOptions: OwlOptions = {
  // loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  margin: 15,
  navSpeed: 600,
  center: false,
  items: 1,
  loop: false,
  stagePadding: 0,
  navText: ['<i class="carousel-control-prev-icon icon-size"></i>', '<i class="carousel-control-next-icon icon-size"></i>'],
  responsive: {
   300: {
    margin: 20,
    nav: true,
    items: 2,
   },
   400: {
    margin: 20,
    nav: true,
    items: 3,
   },
   600: {
    margin: 20,
    nav: true,
    items: 4,
   },
   1000: {
    margin: 20,
    stagePadding: 0,
    nav: true,
    items: 5,
   },
   1200: {
    margin: 20,
    stagePadding: 0,
    nav: true,
    items: 6,
   },
   1400: {
    margin: 20,
    stagePadding: 0,
    nav: true,
    items: 7,
   },
  },
  nav: true,
 };
}
