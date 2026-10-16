import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from 'src/app/doc/document.service';
import { HeaderService } from 'src/app/header/header.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { environment } from 'src/environments/environment';

@Component({
 selector: 'app-document',
 templateUrl: './document.component.html',
 styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit {
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

 constructor(
  private documentService: DocumentService,
  private route: ActivatedRoute,
  private headerService: HeaderService,
  private router: Router,
  private loaderService: LoaderService,
  private sanitizer: DomSanitizer,
  private language: LanguageService
 ) {}

 ngOnInit(): void {
  this.menuId = this.route.snapshot.paramMap.get('id')?.toString();
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.setLanguage();
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
  });
  this.loadNews(this.siteinfo);

  this.imgUrl = environment.apiUrl;
 }

 loadNews(info: any) {
  // this.loaderService.show('');
  //   console.log(this.menuId);
  this.documentService.doclist(this.menuId, info).subscribe({
   next: (result) => {
    this.list = result;
    this.filterlist = result.slice(0, this.pagelimit);
    // console.log(this.list);
    this.pagesize();
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 //  loadSubMenu(info: any) {
 //   // this.loaderService.show('');
 //   this.headerService.sublist(this.menuId, info).subscribe({
 //    next: (result) => {
 //     this.loadNews(this.siteinfo);
 //     this.loaderService.hide();
 //     this.submenu = result;
 //     this.parentmenu = this.submenu ? (this.submenu[0] ? this.submenu[0] : null) : null;
 //     this.getMenuName(this.menuId ? this.menuId : 0);
 //    },
 //    error: (error) => {
 //     this.loaderService.hide();
 //    },
 //   });
 //  }

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
  //   console.log(encodeURI(url));
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
}
