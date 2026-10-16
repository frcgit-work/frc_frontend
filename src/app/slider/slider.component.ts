import { Component, Directive, Sanitizer, OnInit, Input, Pipe, SecurityContext } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SliderService } from './slider.service';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../shared/service/loader.service';
import { LanguageService } from '../shared/service/language.service';
import { NewsService } from '../shared/news.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
 selector: 'app-slider',
 templateUrl: './slider.component.html',
 styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
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

 //  //options

 //  config: SwiperOptions = {
 //   spaceBetween: 2,
 //   slidesPerView: 4,
 //   navigation: false,
 //   autoplay: { delay: 5000, disableOnInteraction: false },
 //   loop: true,
 //   breakpoints: {
 //    640: {
 //     slidesPerView: 6,
 //     spaceBetween: 16,
 //    },
 //    768: {
 //     slidesPerView: 6,
 //     spaceBetween: 16,
 //    },
 //    1024: {
 //     slidesPerView: 8,
 //     spaceBetween: 16,
 //    },
 //    1200: {
 //     slidesPerView: 10,
 //     spaceBetween: 16,
 //    },
 //   },
 //  };

 //  customOptions: OwlOptions = {
 //   loop: true,
 //   mouseDrag: true,
 //   touchDrag: true,
 //   pullDrag: false,
 //   dots: false,
 //   margin: 10,
 //   navSpeed: 600,
 //   navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
 //   responsive: {
 //    0: {
 //     items: 3,
 //    },
 //    400: {
 //     items: 6,
 //    },
 //    760: {
 //     items: 8,
 //    },
 //    1000: {
 //     items: 10,
 //    },
 //   },
 //   nav: true,
 //  };

 constructor(
  private slideService: SliderService,
  private loaderService: LoaderService,
  private language: LanguageService,
  private newsService: NewsService,
  private sanitizer: DomSanitizer
 ) {}

 ngOnInit(): void {
  this.language.setLanguage();
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
  });
  this.slidelist = [
   {
    ids: 186,
    titlename: 'Санхүүгийн зохицуулах хороо',
    picurl: 'resource/frc/image/2022/12/14/n9e5au2x8p7m2o2d/IMG_6953%203.jpg',
    titleinfo: 'Санхүүгийн зохицуулах хороо',
    link: '',
    site: 'main',
    lang: 'mn',
   },
  ];
  this.imgUrl = environment.apiUrl;
  this.loadNews();
  this.loadBanner();
 }

 loadSlide() {
  // this.loaderService.show('');
  this.slideService.slidelist(this.siteinfo, 'top', 'active').subscribe({
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

 loadNews() {
  // this.loaderService.show('');
  this.slideService.slidehome(this.siteinfo.lang === 'mn' ? 18 : 616, this.siteinfo).subscribe({
   next: (result) => {
    // console.log(result);
    this.slidelist = JSON.parse(JSON.stringify(result)).slice(0, 9);
    this.listcount = this.slidelist.length;
   },
  });
 }

 loadBanner() {
  // this.loaderService.show('');
  this.slideService.bannerlist(this.siteinfo, 'popup', 1).subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.banner = result ? (result[0] ? result[0] : null) : null;
    // console.log(this.banner);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 getUrl(url: any) {
  if (url) {
   return "url('" + encodeURI(url.replace('\\', '/')) + "')";
  } else {
   return "url('resource/frc/image/2022/12/14/n9e5au2x8p7m2o2d/IMG_6953%203.jpg')";
  }
 }

 getHTML(html: any) {
  //   return this.sanitizer.bypassSecurityTrustHtml(html);
  return this.sanitizer.sanitize(SecurityContext.HTML, html);
 }
}
