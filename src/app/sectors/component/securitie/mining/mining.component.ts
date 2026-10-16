import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MWService } from 'src/app/mw/mw.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { LoaderService } from 'src/app/shared/service/loader.service';

@Component({
  selector: 'app-mining',
  templateUrl: './mining.component.html',
  styleUrls: ['./mining.component.scss']
})
export class MiningComponent implements OnInit {
menuId: string | undefined;
 list: any;
 siteinfo: any;
 filterlist: any;

 pagelength: any;
 numbers: number[] = [];
 pagemax: any;
 pagelimit = 20;
 currentpage = 1;
 searchbox = 0;
 searchlist: any;
 orgtypeId: any;

 constructor(
  private mwService: MWService,
  private loaderService: LoaderService,
  private route: ActivatedRoute,
  private sanitizer: DomSanitizer,
  private language: LanguageService
 ) {}

 ngOnInit(): void {
  this.orgtypeId = this.route.snapshot.paramMap.get('id')?.toString();
  if (!this.menuId) {
   this.menuId = JSON.parse(localStorage.getItem('menuId')!);
  }
  //   console.log(this.orgtypeId);

  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.setLanguage();
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
  });

  var current: any = 1;
  current = localStorage.getItem('currentpage');
  localStorage.setItem('orgtypeid', this.orgtypeId ? this.orgtypeId : 0);

  // this.loaderService.show('');
  //   console.log(menuId);
  this.mwService.mining().subscribe({
   next: (result) => {
    this.list = result;
    this.filterlist = result.slice(0, this.pagelimit);
    this.pagesize();
    if (Number(current) > 1) {
     this.page(Number(current));
    }
    // console.log(result);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
  //   this.loadOrgs(this.menuId);
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
  localStorage.setItem('currentpage', this.currentpage.toString());
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
   return item.entity_name.toLowerCase().includes(event.target.value.toLowerCase());
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

 searchdate(event: any) {
  this.searchbox = 1;
  if (event.target.value === '') {
   this.searchlist = this.list;
   this.searchbox = 0;
  } else {
   this.searchlist = this.list.filter((item: any) => {
    const data = new Date(item.license_date).toDateString() === new Date(event.target.value).toDateString();
    return data;
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
}
