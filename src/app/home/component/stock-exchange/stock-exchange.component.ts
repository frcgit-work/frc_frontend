import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LanguageService } from 'src/app/shared/service/language.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { SliderService } from 'src/app/slider/slider.service';
import { environment } from 'src/environments/environment';

@Component({
 selector: 'app-stock-exchange',
 templateUrl: './stock-exchange.component.html',
 styleUrls: ['./stock-exchange.component.scss'],
})
export class StockExchangeComponent implements OnInit {
 customOptions: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
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
  },
  nav: true,
 };

 slidesStore: any;
 site: any;
 lang: any;
 slidelist: any;
 imgUrl: string | undefined;
 banner: any;
 siteinfo: any;
 listcount = 0;
 constructor(private slideService: SliderService, private loaderService: LoaderService, private language: LanguageService) {}

 ngOnInit(): void {
  this.language.setLanguage();
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
  });
  this.imgUrl = environment.apiUrl;
  this.loadSlide();
 }

 loadSlide() {
  // this.loaderService.show('');
  this.slideService.slidelist(this.siteinfo, 'mse', 'active').subscribe({
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

 getUrl(url: any) {
  return "url('" + encodeURI(url.replace('\\', '/')) + "')";
 }
}
