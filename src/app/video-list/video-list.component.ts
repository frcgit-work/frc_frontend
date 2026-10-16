import { DatePipe } from '@angular/common';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HeaderService } from '../header/header.service';
import { HomeService } from '../home/home.service';
import { LanguageService } from '../shared/service/language.service';
import { LoaderService } from '../shared/service/loader.service';

@Component({
 selector: 'app-video-list',
 templateUrl: './video-list.component.html',
 styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent implements OnInit {
 site: any;
 lang: any;
 videolist: any;
 imgUrl: string | undefined;
 submenu: any;
 menuId: string | undefined;
 currentMenu: any;
 siteinfo: any;
 parentmenu: any;
 videocount: any;
 pagelist: any;
 apiurl = environment.imgUrl;
 pagemax: any;
 pagelength: any;
 numbers: number[] = [];
 pagelimit = 30;
 currentpage = 1;
 deltas: any;
 days: any;

 searchbox = 0;
 list: any;
 constructor(
  private homeService: HomeService,
  private route: ActivatedRoute,
  private headerService: HeaderService,
  private router: Router,
  private loaderService: LoaderService,
  private sanitizer: DomSanitizer,
  private language: LanguageService,
  private datepipe: DatePipe
 ) {}

 ngOnInit(): void {
  this.menuId = this.route.snapshot.paramMap.get('id')?.toString();
  this.language.setLanguage();
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
  });
  this.loadSubMenu(this.siteinfo);
  this.language.weblog(this.router.url, this.siteinfo);
  this.imgUrl = environment.apiUrl;
 }

 loadNews(info: any) {
  // this.loaderService.show('');
  //   console.log(this.menuId);
  this.homeService.videolist(this.menuId, info, { status: 'active' }).subscribe({
   next: (result) => {
    this.list = result;
    // console.log(result);
    this.videolist = this.list.slice(0, this.pagelimit);
    this.videocount = this.list.length;
    this.pagesize();
    // console.log(this.videolist);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 loadSubMenu(info: any) {
  // this.loaderService.show('');
  this.headerService.sublist(this.menuId, info).subscribe({
   next: (result) => {
    this.loadNews(this.siteinfo);
    this.submenu = result;
    this.parentmenu = this.submenu ? (this.submenu[0] ? this.submenu[0] : null) : null;
    this.getMenuName(this.menuId);
    this.loaderService.hide();
    // console.log(this.submenu);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 pagesize() {
  this.pagelength = Math.ceil(this.videocount / this.pagelimit);
  this.numbers = new Array<number>(this.pagelength);
 }

 page(pagination: any) {
  this.currentpage = pagination;
  this.videolist = this.list.slice((pagination - 1) * this.pagelimit, pagination * this.pagelimit);
 }

 get_parent_main(menu: any) {
  var data;
  if (menu?.parentid === 0) {
   data = this.submenu?.filter((x: { parentid: number }) => (x.parentid === menu.iDs ? menu.iDs : 0));
  } else {
   data = this.submenu?.filter((x: { parentid: number }) => x.parentid === menu.parentid);
  }
  return data;
 }

 get_parent(menuid: number) {
  return this.submenu?.filter((x: { parentid: number }) => x.parentid === menuid);
 }

 get_parent_count(menuid: number) {
  //   console.log(menuid);
  //   console.log(this.submenu?.filter((x: { parentid: number }) => x.parentid === menuid));
  return this.submenu?.filter((x: { parentid: number }) => x.parentid === menuid).length;
 }

 getMenuName(menuId: any) {
  this.currentMenu = this.submenu.filter((x: { iDs: any }) => Number(x.iDs) === Number(menuId));
  this.currentMenu = this.currentMenu ? (this.currentMenu[0] ? this.currentMenu[0] : null) : null;
 }

 getimg(url: string) {
  //   console.log(url);
  if (url) {
   //    return 'https://www.frc.mn/' + url;
   return this.apiurl + url;
  } else {
   return this.apiurl + environment.defaultImgUrl;
  }
 }

 getimgview(url: string) {
  if (url) {
   return this.apiurl + url;
  } else {
   return '';
  }
 }

 getHTML(html: any) {
  return this.sanitizer.sanitize(SecurityContext.HTML, html);
 }

 embedUrl(html: any) {
  return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube-nocookie.com/embed/' + html);
 }

 public parseDates(fromValue: string) {
  var fromMs = Date.parse(fromValue);
  var toMs = Date.parse(new Date().toLocaleString());

  var deltaSeconds = (toMs - fromMs) / 1000;

  this.deltas = [this.format(this.calculateDaysHoursMinutesSeconds(deltaSeconds))];
  //   console.log(this.deltas);
  if (this.days > 2) {
   return this.datepipe.transform(fromValue, 'yyyy-MM-dd');

   //    //    return this.deltas;
  } else {
   return this.deltas;
  }
 }

 private calculateDaysHoursMinutesSeconds(delta: number): number[] {
  this.days = Math.floor(delta / 60 / 60 / 24);
  var remainder = delta - this.days * 60 * 60 * 24;

  return [this.days, ...this.calculateHoursMinutesSeconds(remainder)];
 }

 private calculateHoursMinutesSeconds(delta: number): number[] {
  var hours = Math.floor(delta / 60 / 60);
  var remainder = delta - hours * 60 * 60;

  return [hours, ...this.calculateMinutesSeconds(remainder)];
 }

 // I calculate the delta breakdown using Minute as the largest unit.
 private calculateMinutesSeconds(delta: number): number[] {
  var minutes = Math.floor(delta / 60);
  var remainder = delta - minutes * 60;

  return [minutes];
 }

 private format(values: number[]): string {
  var units: string[] = ['өдөр', 'цаг', 'минут'];
  var parts: string[] = [];

  for (var value of values.slice().reverse()) {
   if (value > 0) {
    parts.unshift(value.toLocaleString() + ' ' + units.pop());
   }
  }

  return parts.join(', ');
 }

 link(url: any) {
  window.location.href = url;
 }
}
