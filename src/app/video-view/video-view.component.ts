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
 selector: 'app-video-view',
 templateUrl: './video-view.component.html',
 styleUrls: ['./video-view.component.scss'],
})
export class VideoViewComponent implements OnInit {
 site: any;
 lang: any;
 imgUrl: string | undefined;
 newsId: any;
 news: any;
 submenu: any;
 currentMenu: any;
 menuId: any;
 siteinfo: any;
 parentmenu: any;
 pagelist: any;
 apiurl = environment.imgUrl;
 deltas: any;
 days: any;
 constructor(
  private homeService: HomeService,
  private route: ActivatedRoute,
  private headerService: HeaderService,
  private loaderService: LoaderService,
  private sanitizer: DomSanitizer,
  private language: LanguageService,
  private datepipe: DatePipe,
  private router: Router
 ) {}

 ngOnInit(): void {
  this.imgUrl = environment.apiUrl;
  this.newsId = this.route.snapshot.paramMap.get('id')?.toString();
  this.language.setLanguage();
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
  });
  this.loadNews(this.newsId);
  this.language.weblog(this.router.url, this.siteinfo);
 }

 loadNews(newId: any) {
  // this.loaderService.show('');
  this.homeService.videoview(newId).subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.news = JSON.parse(JSON.stringify(result));
    this.menuId = this.news ? this.news.menuid : 0;
    this.homeService.setcount(this.newsId).subscribe();
    this.loadSubMenu(this.menuId);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 loadSubMenu(menuId: any) {
  // this.loaderService.show('');
  const siteinfo = JSON.parse(localStorage.getItem('siteinfo')!);
  this.headerService.sublist(menuId, siteinfo).subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.submenu = result;
    this.parentmenu = this.submenu ? (this.submenu[0] ? this.submenu[0] : null) : null;
    this.getMenuName(this.menuId);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
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
  if (url) {
   //  return 'http://www.frc.mn/resource/' + url;
   return this.apiurl + url;
  } else {
   return ''; //'http://www.frc.mn/environment.defaultImgUrl';
  }
 }

 getHTML(html: any) {
  return this.sanitizer.sanitize(SecurityContext.HTML, html);
 }

 timelinecolor(indx: any) {
  let color = '';
  if (indx >= 0 && indx <= 5) {
   color = '#ff5600';
  }
  if (indx > 5 && indx <= 10) {
   color = '#ffa705';
  }
  if (indx > 10 && indx <= 15) {
   color = '#12affe';
  }
  if (indx > 15 && indx <= 20) {
   color = '#69e9f2';
  }
  if (indx > 20) {
   color = '#3224e9';
  }
  return color;
 }

 embedUrl(html: any) {
  return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + html);
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
