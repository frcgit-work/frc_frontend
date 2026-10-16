import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HeaderService } from '../header/header.service';
import { NewsService } from '../shared/news.service';
import { LanguageService } from '../shared/service/language.service';
import { LoaderService } from '../shared/service/loader.service';
import { SafeHtmlPipe } from '../shared/service/safe-html.pipe';

@Component({
 selector: 'app-view1',
 templateUrl: './view1.component.html',
 styleUrls: ['./view1.component.scss'],
})
export class View1Component implements OnInit {
 site: any;
 lang: any;
 newslist: any;
 imgUrl: string | undefined;
 submenu: any;
 menuId: string | undefined;
 currentMenu: any;
 siteinfo: any;
 parentmenu: any;
 newscount: any;
 pagelist: any;
 apiurl = environment.imgUrl;
 pagemax: any;
 pagelength: any;
 numbers: number[] = [];
 pagelimit = 30;
 currentpage = 0;
 piclist: any;
 deltas: any;
 days: any;
 constructor(
  private newsService: NewsService,
  private route: ActivatedRoute,
  private headerService: HeaderService,
  private router: Router,
  private loaderService: LoaderService,
  private sanitizer: DomSanitizer,
  private language: LanguageService,
  private datepipe: DatePipe,
  private safeHtml: SafeHtmlPipe
 ) {}

 ngOnInit(): void {
  this.menuId = this.route.snapshot.paramMap.get('id')?.toString();
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.setLanguage();
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
  });
  this.loadSubMenu(this.siteinfo);

  this.imgUrl = environment.apiUrl;
  this.language.weblog(this.router.url, this.siteinfo);
 }

 loadNews(info: any) {
  this.loaderService.show('Уншиж байна');
  //   console.log(this.menuId);
  this.newsService.newslist(this.menuId, info, '', this.currentpage).subscribe({
   next: (result) => {
    this.newslist = result;

    this.newscount = this.newslist.length;
    // console.log(this.newscount);
    this.loadNewsCount(info);
    if (this.newscount <= 1) {
     this.loadPage();
    }
    // console.log(this.newslist[0]);
    // this.loaderService.hide();
    // console.log(this.newscount);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 loadNewsCount(info: any) {
  //   // this.loaderService.show('');
  this.newsService.count(this.menuId, info).subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.newscount = result;
    // console.log(this.newscount);
    this.pagesize();
    // console.log(this.newslist);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 loadPic() {
  //   // this.loaderService.show('');
  const pageid = this.newslist[0]?.pageid ? this.newslist[0].pageid : this.newslist[0]?.iDs;
  this.headerService.piclist(pageid).subscribe({
   next: (result) => {
    this.loaderService.hide();
    if (result) {
     this.piclist = result;
    } else {
     this.pagelist = { iDs: 0, title: '', picurl: '', pageid: '0' };
    }
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 pagesize() {
  this.pagemax = this.newscount;
  this.pagelength = Math.ceil(this.pagemax / this.pagelimit);
  this.numbers = new Array<number>(this.pagelength);
 }

 page(pagination: any) {
  this.currentpage = pagination;
  this.loadNews(this.siteinfo);
  // console.log()
 }

 loadSubMenu(info: any) {
  //   // this.loaderService.show('');
  this.headerService.sublist(this.menuId, info).subscribe({
   next: (result) => {
    this.loadNews(this.siteinfo);
    this.submenu = result;
    this.parentmenu = this.submenu ? (this.submenu[0] ? this.submenu[0] : null) : null;
    // console.log(this.parentmenu);
    this.getMenuName(this.menuId);
    this.loaderService.hide();
    // console.log(this.submenu);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 loadPage() {
  //   this.loaderService.show('');
  const pageid = this.newslist[0]?.pageid ? this.newslist[0].pageid : this.newslist[0]?.iDs;
  this.headerService.pagelist(pageid).subscribe({
   next: (result) => {
    this.loaderService.hide();
    if (result) {
     this.pagelist = result;
    } else {
     this.pagelist = { iDs: 0, title: '', info: '', status: '', styleid: '', pageid: '0' };
    }
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

 get_parent(menuid: number, tid: any = 0) {
  var data;
  data = this.submenu?.filter((x: { parentid: number }) => x.parentid === menuid);
  return data;
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
   //    return 'https://www.frc.mn/' + url;
   return this.apiurl + url;
  } else {
   return this.apiurl + environment.defaultImgUrl;
  }
 }

 getUrl(url: any) {
  return "url('" + encodeURI(url.replace('\\', '/')) + "')";
 }

 getimgview(url: string) {
  if (url) {
   return this.apiurl + url;
  } else {
   return '';
  }
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

 getHTML(html: any) {
  return this.sanitizer.bypassSecurityTrustHtml(html);
 }
 public parseDates(fromValue: string) {
  var fromMs = Date.parse(fromValue);
  var toMs = Date.parse(new Date().toLocaleString());

  var deltaSeconds = (toMs - fromMs) / 1000;

  this.deltas = [this.format(this.calculateDaysHoursMinutesSeconds(deltaSeconds))];
  //   console.log(this.deltas);
  if (this.days > 2) {
   return this.datepipe.transform(fromValue, 'yyyy-MM-dd');
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
