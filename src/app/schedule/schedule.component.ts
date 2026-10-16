import { Component, OnInit, SecurityContext } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ScheduleService } from './schedule.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../header/header.service';
import { LoaderService } from '../shared/service/loader.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService } from '../shared/service/language.service';
import { NewsService } from '../shared/news.service';

@Component({
 selector: 'app-schedule',
 templateUrl: './schedule.component.html',
 styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
 site: any;
 lang: any;
 list: any;
 imgUrl: string | undefined;
 submenu: any;
 menuId: string | undefined;
 currentMenu: any;
 siteinfo: any;
 parentmenu: any;

 filterlist: any;

 pagelength: any;
 numbers: number[] = [];
 pagemax: any;
 pagelimit = 20;
 currentpage = 1;
 searchbox = 0;
 searchlist: any;
 apiurl = environment.imgUrl;
 news: any;
 typelist: any;
 repeatlist: any;

 constructor(
  private scheduletService: ScheduleService,
  private route: ActivatedRoute,
  private headerService: HeaderService,
  private router: Router,
  private loaderService: LoaderService,
  private sanitizer: DomSanitizer,
  private language: LanguageService,
  private newsService: NewsService
 ) {}

 ngOnInit(): void {
  this.menuId = this.route.snapshot.paramMap.get('id')?.toString();
  this.language.setLanguage();
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
  });
  this.loadSubMenu(this.siteinfo);
  this.loadDoc(this.siteinfo);
  this.loadType();
  this.loadRepeat();
  this.language.weblog(this.router.url, this.siteinfo);

  this.imgUrl = environment.apiUrl;
 }

 loadDoc(info: any) {
  // this.loaderService.show('');
  //   console.log(this.menuId);
  this.scheduletService.doclist(this.menuId, info).subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.list = result;
    this.filterlist = result.slice(0, this.pagelimit);
    this.pagesize();
    // console.log(this.list);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 loadType() {
  this.scheduletService.typelist().subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.typelist = result;
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 loadRepeat() {
  this.scheduletService.repeatlist().subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.repeatlist = result;
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 pagesize() {
  this.pagemax = this.list.length;
  this.pagelength = Math.ceil(this.pagemax / this.pagelimit);
  this.numbers = new Array<number>(this.pagelength);
 }

 page(pagination: any) {
  this.currentpage = pagination;
  // console.log(this.searchbox);
  if (this.searchbox === 0) {
   this.filterlist = this.list.slice((pagination - 1) * this.pagelimit, pagination * this.pagelimit);
  } else {
   this.filterlist = this.searchlist.slice((pagination - 1) * this.pagelimit, pagination * this.pagelimit);
  }

  // console.log()
 }

 loadSubMenu(info: any) {
  // this.loaderService.show('');
  this.headerService.sublist(this.menuId, info).subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.submenu = result;
    this.parentmenu = this.submenu ? (this.submenu[0] ? this.submenu[0] : null) : null;
    this.getMenuName(this.menuId ? this.menuId : 0);
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
   //    return 'https://www.frc.mn/' + url;
   return this.apiurl + url;
  } else {
   return this.apiurl + environment.defaultImgUrl;
  }
 }

 getHTML(html: any) {
  return this.sanitizer.sanitize(SecurityContext.HTML, html);
 }

 getUrl(html: any) {
  return this.apiurl + html;
 }
 searchtitle(event: any) {
  this.searchbox = 1;
  if (event.target.value === '') {
   this.searchbox = 0;
  }
  this.searchlist = this.list.filter((item: any) => {
   return item.title.toLowerCase().includes(event.target.value.toLowerCase());
  });
  // this.pagesize();

  if (this.searchbox === 0) {
   this.pagemax = this.list.length;
  } else {
   this.pagemax = this.searchlist.length;
  }
  this.pagelength = Math.ceil(this.pagemax / this.pagelimit);
  this.numbers = new Array<number>(this.pagelength);
  this.filterlist = this.searchlist.slice(0, this.pagelimit);

  // console.log(this.searchbox);
 }

 search(event: any) {
  this.searchbox = 1;
  if (event.target.value === '') {
   this.searchbox = 0;
  }
  this.searchlist = this.list.filter((item: any) => {
   return item.info.toLowerCase().includes(event.target.value.toLowerCase());
  });
  // this.pagesize();

  if (this.searchbox === 0) {
   this.pagemax = this.list.length;
  } else {
   this.pagemax = this.searchlist.length;
  }
  this.pagelength = Math.ceil(this.pagemax / this.pagelimit);
  this.numbers = new Array<number>(this.pagelength);
  this.filterlist = this.searchlist.slice(0, this.pagelimit);

  // console.log(this.searchbox);
 }

 searchnum(event: any) {
  this.searchbox = 1;
  if (event.target.value === '') {
   this.searchlist = this.list;
   this.searchbox = 0;
  } else {
   this.searchlist = this.list.filter((item: any) => {
    return item.schedule.toString().toLowerCase().includes(event.target.value.toLowerCase());
   });
  }

  if (this.searchbox === 0) {
   this.pagemax = this.list.length;
  } else {
   this.pagemax = this.searchlist.length;
  }
  this.pagelength = Math.ceil(this.pagemax / this.pagelimit);
  this.numbers = new Array<number>(this.pagelength);
  this.filterlist = this.searchlist.slice(0, this.pagelimit);

  // console.log(this.searchbox);
 }

 searchtype(event: any) {
  console.log(event.target.value);
  this.searchbox = 1;
  if (event.target.value === '' || event.target.value === '0') {
   this.searchlist = this.list;
   this.searchbox = 0;
  } else {
   this.searchlist = this.list.filter((item: any) => {
    return Number(item.tid) === Number(event.target.value);
   });
  }

  if (this.searchbox === 0) {
   this.pagemax = this.list.length;
  } else {
   this.pagemax = this.searchlist.length;
  }
  this.pagelength = Math.ceil(this.pagemax / this.pagelimit);
  this.numbers = new Array<number>(this.pagelength);
  this.filterlist = this.searchlist.slice(0, this.pagelimit);

  // console.log(this.searchbox);
 }

 searchrepeat(event: any) {
  console.log(event.target.value);
  this.searchbox = 1;
  if (event.target.value === '' || event.target.value === '0') {
   this.searchlist = this.list;
   this.searchbox = 0;
  } else {
   this.searchlist = this.list.filter((item: any) => {
    return Number(item.rid) === Number(event.target.value);
   });
  }

  if (this.searchbox === 0) {
   this.pagemax = this.list.length;
  } else {
   this.pagemax = this.searchlist.length;
  }
  this.pagelength = Math.ceil(this.pagemax / this.pagelimit);
  this.numbers = new Array<number>(this.pagelength);
  this.filterlist = this.searchlist.slice(0, this.pagelimit);

  // console.log(this.searchbox);
 }

 link(url: any) {
  window.location.href = url;
 }
}
