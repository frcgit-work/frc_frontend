import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
 selector: 'app-chart-new',
 templateUrl: './chart-new.component.html',
 styleUrls: ['./chart-new.component.scss'],
})
export class ChartNewComponent implements OnInit {
 siteinfo: any;
 chart: any;
 tabname: any;
 charttab: any;
 current_url: any;
 constructor(
  private homeService: HomeService,
  private loaderService: LoaderService,
  private language: LanguageService,
  private sanitizer: DomSanitizer
 ) {}

 ngOnInit(): void {
  this.language.setLanguage();
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
  });

  this.loadChart();
 }

 loadChart() {
  // this.loaderService.show('');
  this.homeService.chartlist(this.siteinfo, 'active').subscribe({
   next: (result) => {
    this.loaderService.hide();
    const chart: any[] = JSON.parse(JSON.stringify(result));
    this.chart = chart?.sort((a, b) => (a.iDs !== b.iDs ? (a.iDs < b.iDs ? -1 : 1) : 0));
    this.charttab = this.chart[0]?.iDs;
    this.tab(this.charttab);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 tab(item: any) {
  this.tabname = 'tab' + item.iDs;
  this.charttab = item.iDs;
  // this.current_url = 'http://www.frc.mn/chart/#/chart;id=' + this.charttab;
  // console.log(this.current_url);
 }
}
