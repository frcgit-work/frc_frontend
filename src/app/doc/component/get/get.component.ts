import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/header/header.service';
import { NewsService } from 'src/app/shared/news.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { environment } from 'src/environments/environment';
import { DocumentService } from '../../document.service';

@Component({
 selector: 'app-get',
 templateUrl: './get.component.html',
 styleUrls: ['./get.component.scss'],
})
export class GetComponent implements OnInit {
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

 constructor(
  private documentService: DocumentService,
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
  this.language.weblog(this.router.url, this.siteinfo);

  this.imgUrl = environment.apiUrl;
 }

 loadDoc(info: any) {
  // this.loaderService.show('');
  //   console.log(this.menuId);
  this.documentService.doclist(this.menuId, info).subscribe({
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

 loadNews(info: any) {
  // this.loaderService.show('');
  //   console.log(this.menuId);
  this.newsService.newslist(this.menuId, info).subscribe({
   next: (result) => {
    this.news = result;
    this.news = this.news ? (this.news[0] ? this.news[0] : []) : [];
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
    this.loadNews(this.siteinfo);
    this.loadDoc(this.siteinfo);
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

 search(event: any) {
  this.searchbox = 1;
  if (event.target.value === '') {
   this.searchbox = 0;
  }
  this.searchlist = this.list.filter((item: any) => {
   return item.subject.toLowerCase().includes(event.target.value.toLowerCase());
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
    return item.docnum.toString().toLowerCase().includes(event.target.value.toLowerCase());
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
