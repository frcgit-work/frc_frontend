import { Component, OnInit } from '@angular/core';
import { SliderService } from '../slider/slider.service';
import { LanguageService } from '../shared/service/language.service';
import { environment } from 'src/environments/environment';
import { HeaderService } from '../header/header.service';

@Component({
 selector: 'app-main',
 templateUrl: './main.component.html',
 styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
 siteinfo: any;
 list: any;
 apiUrl = environment.imgUrl;
 menulist: any;
 constructor(private slideService: SliderService, private language: LanguageService, private headerService: HeaderService) {}

 ngOnInit(): void {
  this.language.setLanguage();
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
  });
  this.loadSlide();
  this.loadMenu();
 }

 loadMenu() {
  this.headerService.menulist(this.siteinfo, 'main').subscribe({
   next: (result) => {
    this.menulist = result;
   },
   error: (error) => {},
  });
 }

 loadSlide() {
  // this.loaderService.show('');
  this.slideService.slidelist(this.siteinfo, 'firstpicture', 'active').subscribe({
   next: (result) => {
    this.list = result;
    this.list = this.list ? (this.list[0] ? this.list[0] : null) : null;
   },
   error: (error) => {},
  });
 }
}
