import { Component, OnInit, SecurityContext } from '@angular/core';
import { FaqService } from './faq.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../header/header.service';
import { LoaderService } from '../shared/service/loader.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService } from '../shared/service/language.service';
import { NewsService } from '../shared/news.service';
import { environment } from 'src/environments/environment';

@Component({
 selector: 'app-faq',
 templateUrl: './faq.component.html',
 styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
 site: any;
 lang: any;
 selecteditem = 0;
 list: any;
 imgUrl: string | undefined;
 submenu: any;
 menuId: string | undefined;
 currentMenu: any;
 siteinfo: any;
 parentmenu: any;
 apiurl = environment.imgUrl;
 news: any;
 constructor(
  private faqService: FaqService,
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
  this.faqService.doclist(this.menuId, info).subscribe({
   next: (result) => {
    this.list = result;
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
   return this.apiurl + url;
  } else {
   return this.apiurl + environment.defaultImgUrl;
  }
 }

 getHTML(html: any) {
  return this.sanitizer.sanitize(SecurityContext.HTML, html);
 }

 getUrl(html: any) {
  return this.sanitizer.bypassSecurityTrustResourceUrl(this.apiurl + html);
 }

 link(url: any) {
  window.location.href = url;
 }
}
