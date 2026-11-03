import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../shared/service/language.service';
import { LoaderService } from '../shared/service/loader.service';
import { HeaderService } from './header.service';

@Component({
 selector: 'app-header',
 templateUrl: './header.component.html',
 styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
 site: any;
 lang: any;
 menulist: any[] | undefined;
 menu: string = '';
 mobile: boolean = false;
 showmenu: boolean = false;
 banner: any;
 sociallist: any;
 siteinfo: any;
 currencylist: any;
 loadcount = 0;
 listcount = 0;
 searchtext: any;
 traditionalMenuMode = false;
 isConvertingTraditionalMenu = false;
 private traditionalMenuLabels: Record<number, string> = {};

 constructor(
  private headerService: HeaderService,
  private router: Router,
  private loaderService: LoaderService,
  private language: LanguageService,
  private http: HttpClient
 ) {}

 ngOnInit(): void {
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.setLanguage();
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
   //    this.loadMenu();
  });
  this.loadMenu();
  this.loadCurrency();
  this.loadMenu();

  this.router.routeReuseStrategy.shouldReuseRoute = function () {
   return true;
  };
  // const width = this.windowService.windowRef.innerWidth;
 }

 loadMenu() {
  this.headerService.menulist(this.siteinfo, 'main').subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.menulist = result;
    this.menulist?.filter((x: any) => x.menuvisible === 1);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 changelang(lang: any) {
  this.router.navigate(['home', { lang: lang }]);
  this.siteinfo = { lang: lang, site: 'main' };
  this.traditionalMenuMode = false;
  this.traditionalMenuLabels = {};
  this.loadMenu();
 }

 loadCurrency() {
  //   console.log('Currency');
  // this.loaderService.show('');
  this.headerService.currencylist().subscribe({
   next: (result) => {
    this.loaderService.hide();
    var currency = JSON.parse(JSON.stringify(result));
    currency = currency.data;
    this.listcount = currency?.length;
    if (currency) {
     this.currencylist = currency[this.listcount - 1] ? currency[this.listcount - 1] : currency[this.listcount - 2];
     this.social();
    }
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 social() {
  // this.loaderService.show('');
  this.headerService.sociallist(this.siteinfo, 'active').subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.sociallist = result;
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 parentmenu(menuid: number) {
  return this.menulist?.filter((x) => x.parentid === menuid && x.menuvisible === 1);
 }

 menuLabel(item: any): string {
  return this.traditionalMenuMode ? this.traditionalMenuLabels[item.iDs] || item.menuname : item.menuname;
 }

 async toggleTraditionalMenu(): Promise<void> {
  if (this.traditionalMenuMode) {
   this.traditionalMenuMode = false;
   return;
  }

  if (this.siteinfo?.lang !== 'mn' || !this.menulist?.length || this.isConvertingTraditionalMenu) {
   return;
  }

  this.isConvertingTraditionalMenu = true;
  try {
   const { convert } = await import('@gege-mn/gege-converter');
   if (this.siteinfo?.lang !== 'mn') {
    return;
   }

   this.traditionalMenuLabels = (this.menulist || []).reduce((labels: Record<number, string>, item: any) => {
    labels[item.iDs] = convert(item.menuname || '');
    return labels;
   }, {});
   this.traditionalMenuMode = true;
  } catch {
   this.traditionalMenuMode = false;
  } finally {
   this.isConvertingTraditionalMenu = false;
  }
 }

 link(url: any) {
  //   console.log('click');
  //   window.location.href = url;
 }

 search() {
  this.router.navigate(['search', { q: this.searchtext }]);
 }

 test() {
  //   this.mobile = false;
 }
 clickmenu() {
  this.mobile = true;
  this.showmenu ? (this.showmenu = false) : (this.showmenu = true);
 }
}
