import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HeaderService } from '../header/header.service';
import { LanguageService } from '../shared/service/language.service';
import { LoaderService } from '../shared/service/loader.service';
import { SliderService } from '../slider/slider.service';
import { FooterService } from './footer.service';

@Component({
 selector: 'app-footer',
 templateUrl: './footer.component.html',
 styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
 sociallist: any;
 siteinfo: any;
 menulist: any;
 leftmenu: any;
 apiurl = environment.imgUrl;
 contactlist: any;
 footerdate: any;
 constructor(
  private headerService: HeaderService,
  private slideService: SliderService,
  private router: Router,
  private loaderService: LoaderService,
  private language: LanguageService,
  private sanitizer: DomSanitizer
 ) {}

 ngOnInit(): void {
  this.footerdate = new Date();
  this.language.setLanguage();
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
   this.loadMenu();
   this.loadContact();
  });
  this.social();
  this.loadSlide();
  //   this.loadMenu();

  this.router.routeReuseStrategy.shouldReuseRoute = function () {
   return false;
  };
 }

 loadMenu() {
  // this.loaderService.show('');
  this.headerService.menulist(this.siteinfo, 'footer').subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.menulist = result;
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 loadSlide() {
  // this.loaderService.show('');
  this.slideService.slidelist(this.siteinfo, 'leftfixed').subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.leftmenu = result;
    // console.log(this.leftmenu);
   },
   error: (error) => {
    // console.log(error);
    // this.loaderService.show('');
   },
  });
 }

 social() {
  // this.loaderService.show('');
  this.headerService.sociallist(this.siteinfo, 'active').subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.sociallist = result;
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 loadContact() {
  // this.loaderService.show('');
  this.headerService.pagestyle(this.siteinfo, 'contact').subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.contactlist = result;
   },
   error: (error) => {},
  });
 }

 parentmenu(menuid: number) {
  return this.menulist?.filter((x: { parentid: number }) => x.parentid === menuid);
 }

 getimg(url: string) {
  if (url) {
   return this.apiurl + url;
   //    return 'http://www.frc.mn/resource/frc/image/2022/02/26/i8p85e2fvp2qxjdh/1-41.png';
  } else {
   return this.apiurl + environment.defaultImgUrl;
  }
 }

 getHTML(html: any) {
  return this.sanitizer.bypassSecurityTrustHtml(html);
 }
}
