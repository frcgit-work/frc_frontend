import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/shared/news.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { environment } from 'src/environments/environment';

@Component({
 selector: 'app-home-list',
 templateUrl: './home-list.component.html',
 styleUrls: ['./home-list.component.scss'],
})
export class HomeListComponent implements OnInit {
 site: any;
 lang: any;
 newslist: any;
 imgUrl: string | undefined;
 siteinfo: any;
 apiurl = environment.imgUrl;
 deltas: any;
 listcount = 0;
 days: any;
 constructor(
  private newsService: NewsService,
  private loaderService: LoaderService,
  private language: LanguageService,
  public datepipe: DatePipe
 ) {}

 ngOnInit(): void {
  this.imgUrl = environment.apiUrl;
  this.language.setLanguage();
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
  });
  this.loadNews();
  //   this.parseDates('2023-01-13 12:18', '2023-01-13 15:15');
 }

 loadNews() {
  // this.loaderService.show('');
  this.newsService.newslist(this.siteinfo.lang === 'mn' ? 61 : 616, this.siteinfo).subscribe({
   next: (result) => {
    // this.loaderService.hide();
    this.newslist = result.slice(0, 4);
    this.listcount = this.newslist.length;
    // console.log(this.newslist);
   },
  });
 }

 getimg(url: string) {
  if (url) {
   return this.apiurl + url;
  } else {
   return this.apiurl + environment.defaultImgUrl;
  }
 }

 public parseDates(fromValue: string) {
  var fromMs = Date.parse(fromValue);
  var toMs = Date.parse(new Date().toLocaleString());

  var deltaSeconds = (toMs - fromMs) / 1000;

  this.deltas = [this.format(this.calculateDaysHoursMinutesSeconds(deltaSeconds))];
  //   console.log(this.deltas);
  if (this.days > 2) {
   return this.datepipe.transform(fromValue, 'yyyy-MM-dd');

   //    //    return this.deltas;
  } else {
   return this.deltas;
  }
 }

 private calculateDaysHoursMinutesSeconds(delta: number): number[] {
  this.days = Math.floor(delta / 60 / 60 / 24);
  var remainder = delta - this.days * 60 * 60 * 24;

  return [this.days, ...this.calculateHoursMinutesSeconds(remainder)];
 }

 private calculateHoursMinutesSeconds(delta: number): number[] {
  var hours = Math.floor(delta / 60 / 60);
  var remainder = delta - hours * 60 * 60;

  return [hours, ...this.calculateMinutesSeconds(remainder)];
 }

 // I calculate the delta breakdown using Minute as the largest unit.
 private calculateMinutesSeconds(delta: number): number[] {
  var minutes = Math.floor(delta / 60);
  var remainder = delta - minutes * 60;

  return [minutes];
 }

 private format(values: number[]): string {
  var units: string[] = ['өдөр', 'цаг', 'минут'];
  var parts: string[] = [];

  for (var value of values.slice().reverse()) {
   if (value > 0) {
    parts.unshift(value.toLocaleString() + ' ' + units.pop());
   }
  }

  return parts.join(', ');
 }
}
