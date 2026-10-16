import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HeaderService } from '../header/header.service';
import { NewsService } from '../shared/news.service';
import { LanguageService } from '../shared/service/language.service';
import { LoaderService } from '../shared/service/loader.service';

@Component({
 selector: 'app-contact',
 templateUrl: './contact.component.html',
 styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
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
 constructor(
  private newsService: NewsService,
  private route: ActivatedRoute,
  private headerService: HeaderService,
  private router: Router,
  private loaderService: LoaderService,
  private sanitizer: DomSanitizer,
  private language: LanguageService
 ) {}

 ngOnInit(): void {
  this.menuId = this.route.snapshot.paramMap.get('id')?.toString();
  this.language.setLanguage();
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
    this.newslist = result;
    this.loadPage();
    this.newscount = this.newslist.length;
    this.loadSubMenu(this.menuId);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 loadPage() {
  //   // this.loaderService.show('');
  const pageid = this.newslist
   ? this.newslist[0]
     ? this.newslist[0]?.pageid
       ? this.newslist[0].pageid
       : this.newslist[0]?.iDs
     : null
   : null;
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

 loadSubMenu(menuId: any) {
  //   // this.loaderService.show('');
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

 getimgview(url: string) {
  if (url) {
   return this.apiurl + url;
  } else {
   return '';
  }
 }

 getHTML(html: any) {
  // return this.sanitizer.sanitize(SecurityContext.NONE, html);
  return this.sanitizer.bypassSecurityTrustHtml(html);
 }
}
