import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HeaderService } from '../header/header.service';
import { MWService } from '../mw/mw.service';
import { NewsService } from '../shared/news.service';
import { LanguageService } from '../shared/service/language.service';
import { LoaderService } from '../shared/service/loader.service';

@Component({
 selector: 'app-sectors',
 templateUrl: './sectors.component.html',
 styleUrls: ['./sectors.component.scss'],
})
export class SectorsComponent implements OnInit {
 site: any;
 lang: any;
 newslist: any;
 imgUrl: string | undefined;
 parent: any;
 parentsub: any;
 menuId: string | undefined;
 currentMenu: any;
 siteinfo: any;
 parentmenu: any;
 newscount: any;
 sublist: any;
 list: any;
 news: any;
 apiurl = environment.imgUrl;
 constructor(
  private newsService: NewsService,
  private mwService: MWService,
  private route: ActivatedRoute,
  private headerService: HeaderService,
  private router: Router,
  private loaderService: LoaderService,
  private sanitizer: DomSanitizer,
  private language: LanguageService
 ) {}

 ngOnInit(): void {
  this.menuId = this.route.snapshot.paramMap.get('id')?.toString();
  const pageid = localStorage.getItem('menuId');
  if (this.menuId) {
   if (Number(this.menuId) !== Number(pageid)) {
    localStorage.setItem('currentpage', '1');
   }
   localStorage.setItem('menuId', String(this.menuId));
  }

  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
  });
  this.loadNews(this.siteinfo);
  this.language.weblog(this.router.url, this.siteinfo);

  this.imgUrl = environment.apiUrl;
 }

 loadNews(info: any) {
  // this.loaderService.show('');
  //   console.log(this.menuId);
  this.newsService.newslist(this.menuId, info).subscribe({
   next: (result) => {
    this.news = result;
    // console.log(this.news);
    this.loadSubMenu(this.siteinfo);
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
    this.loaderService.hide();
    this.sublist = result;
    this.parentmenu = this.sublist ? (this.sublist[0] ? this.sublist[0] : null) : null;
    this.getMenuName(this.menuId);
    this.parent = this.sublist?.filter((x: { parentid: number }) => x.parentid === Number(this.menuId));
    this.loadParentSubMenu(this.siteinfo);

    // console.log(this.parent);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 //  loadOrgs(info: any) {
 //   // this.loaderService.show('');
 //   //   console.log(this.menuId);
 //   this.mwService.entity(this.menuId).subscribe({
 //    next: (result) => {
 //     this.list = result;
 //     // console.log(this.list);
 //    },
 //    error: (error) => {
 //     this.loaderService.hide();
 //    },
 //   });
 //  }

 //  loadParentMenu(info: any) {
 //   // this.loaderService.show('');
 //   this.headerService.parentlist(this.menuId, info).subscribe({
 //    next: (result) => {
 //     this.loaderService.hide();
 //     this.parent = result;
 //     console.log(this.parent);
 //     this.loadParentSubMenu(this.siteinfo);
 //    },
 //    error: (error) => {
 //     this.loaderService.hide();
 //    },
 //   });
 //  }

 loadParentSubMenu(info: any) {
  // this.loaderService.show('');
  this.headerService.parentsublist(this.menuId, info).subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.parentsub = result;
    // console.log(this.parentsub);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 get_parent(menuid: number) {
  return this.parentsub?.filter((x: { parentid: number }) => x.parentid === menuid);
 }

 get_parent_count(menuid: number) {
  return this.parentsub?.filter((x: { parentid: number }) => x.parentid === menuid).length;
 }

 getMenuName(menuId: any) {
  this.currentMenu = this.sublist.filter((x: { iDs: any }) => Number(x.iDs) === Number(menuId));
  this.currentMenu = this.currentMenu ? (this.currentMenu[0] ? this.currentMenu[0] : null) : null;
  //   console.log(this.menuId);
 }

 getimg(url: string) {
  if (url) {
   return this.apiurl + url;
  } else {
   return this.apiurl + environment.defaultImgUrl;
  }
 }

 getUrl(html: any) {
  return this.apiurl + html;
 }

 getHTML(html: any) {
  return this.sanitizer.sanitize(SecurityContext.HTML, html);
 }
}
