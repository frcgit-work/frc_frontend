import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MWService } from 'src/app/mw/mw.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { environment } from 'src/environments/environment';

@Component({
 selector: 'app-enotice',
 templateUrl: './enotice.component.html',
 styleUrls: ['./enotice.component.scss'],
})
export class ENoticeComponent implements OnInit {
 menuId: string | undefined;
 list: any;
 filterlist: any;

 pagelength: any;
 numbers: number[] = [];
 pagemax: any;
 pagelimit = 20;

 currentpage = 1;
 searchbox = 0;
 searchlist: any;
 apiurl = environment.imgUrl;
 licenseUrl = environment.licenseUrl;
 decId: any;
 decmenu: any;
 siteinfo: any;

 constructor(
  private mwService: MWService,
  private loaderService: LoaderService,
  private route: ActivatedRoute,
  private sanitizer: DomSanitizer,
  private language: LanguageService
 ) {}

 ngOnInit(): void {
  this.decId = this.route.snapshot.paramMap.get('id')?.toString();
  if (!this.menuId) {
   this.menuId = JSON.parse(localStorage.getItem('menuId')!);
  }
  this.language.setLanguage();
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
  });

  this.mwService.enotice(this.menuId ? this.menuId : 0).subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.list = result;
    this.filterlist = result.slice(0, this.pagelimit);
    this.pagesize();
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });

  //   console.log(menuId);

  //   this.loadOrgs(this.menuId);
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

 getHTML(html: any) {
  return this.sanitizer.sanitize(SecurityContext.HTML, html);
 }

 getUrl(html: any) {
  return this.licenseUrl + html;
 }

 search(event: any) {
  this.searchbox = 1;
  if (event.target.value === '') {
   this.searchbox = 0;
  }
  this.searchlist = this.list.filter((item: any) => {
   return item.decision_name.toLowerCase().includes(event.target.value.toLowerCase());
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
