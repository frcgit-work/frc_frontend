import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from 'src/app/doc/document.service';
import { HeaderService } from 'src/app/header/header.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { environment } from 'src/environments/environment';

@Component({
 selector: 'app-report',
 templateUrl: './report.component.html',
 styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
 tablist: any;
 //  = [
 //   { ids: 1, label: 'Жилийн тайлан', menuid: 542 },
 //   { ids: 2, label: 'Зах зээлийн тойм', menuid: 541 },
 //   { ids: 3, label: 'Сарын тойм', menuid: 484 },
 //   { ids: 4, label: 'Сэтгүүл', menuid: 489 },
 //   { ids: 5, label: 'Судалгааны товхимол', menuid: 490 },
 //   { ids: 6, label: 'Бюллетень', menuid: 491 },
 //   { ids: 7, label: 'Хэм хэмжээний акт', menuid: 492 },
 //  ];
 tabname: any = 'tab1';
 siteinfo: any;
 doclist: any;
 apiurl = environment.imgUrl;
 activemenu: any;
 submenu: any;
 parentmenu: any;
 loading = false;
 doclist1: any;

 constructor(
  private documentService: DocumentService,
  private route: ActivatedRoute,
  private router: Router,
  private loaderService: LoaderService,
  private sanitizer: DomSanitizer,
  private language: LanguageService,
  private headerService: HeaderService
 ) {}

 ngOnInit(): void {
  this.language.setLanguage();
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
   this.loadSubMenu(this.siteinfo);
   //    if (lang === 'en') {
   //     this.tablist = [
   //      { ids: 1, label: 'Annual Report', menuid: 542 },
   //      { ids: 2, label: 'Market Review', menuid: 541 },
   //      { ids: 3, label: 'Legislation', menuid: 484 },
   //      { ids: 4, label: 'Other editions', menuid: 489 },
   //     ];
   //    }
  });
 }

 loadSubMenu(info: any) {
  //   // this.loaderService.show('');
  this.headerService.parentlist(info.lang === 'mn' ? 781 : 782, info).subscribe({
   next: (result) => {
    this.submenu = result;
    this.parentmenu = this.submenu ? (this.submenu[0] ? this.submenu[0] : null) : null;
    this.loaderService.hide();
    this.tablist = [];
    this.submenu.forEach((item: any, index: any) => {
     this.tablist.push({ ids: index + 1, label: item.menuname, menuid: item.fid > 0 ? item.fid : item.iDs });
    });
    this.loadDocument(this.tablist[0]?.menuid);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 tab(item: any) {
  //   console.log(item);
  this.tabname = 'tab' + item.ids;
  this.loadDocument(item.menuid);

  // this.loadChartItem(item.iDs);
 }

 getimg(url: string) {
  if (url) {
   //  return 'http://www.frc.mn/resource/' + url;
   return this.apiurl + url;
  } else {
   return ''; //'http://www.frc.mn/environment.defaultImgUrl';
  }
 }

 loadDocument(menuId: any) {
  this.activemenu = menuId;
  this.loading = true;
  //   this.loaderService.show('');
  //   console.log(this.menuId);
  this.documentService.doclist(menuId, this.siteinfo).subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.loading = false;
    this.doclist = result;
    // console.log(this.doclist);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }
}
