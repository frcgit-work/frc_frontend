import { DatePipe } from '@angular/common';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from 'src/app/shared/service/language.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { environment } from 'src/environments/environment';
import { HomeService } from '../../home.service';

@Component({
 selector: 'app-video',
 templateUrl: './video.component.html',
 styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
 siteinfo: any;
 list: any;
 apiurl = environment.imgUrl;
 videomodal = false;
 videotitle: any;
 videoembed: any;
 videotext: any;
 videoinfo: any;
 listcount = 0;
 deltas: any;
 days: any;
 constructor(
  private homeService: HomeService,
  private route: ActivatedRoute,
  private router: Router,
  private loaderService: LoaderService,
  private sanitizer: DomSanitizer,
  private language: LanguageService,
  private datepipe: DatePipe
 ) {}

 ngOnInit(): void {
  this.language.setLanguage();
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
  });
  this.loadVideo();
 }

 loadVideo() {
  // this.loaderService.show('');
  //   console.log(this.menuId);
  this.homeService.videolist(this.siteinfo.lang === 'mn' ? 65 : 616, this.siteinfo).subscribe({
   next: (result: any) => {
    this.loaderService.hide();
    this.list = result?.slice(0, 3);
    this.listcount = this.list?.length;
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 getHTML(html: any) {
  return this.sanitizer.sanitize(SecurityContext.HTML, html);
 }

 embedUrl(html: any) {
  const data = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + html);
  return data;
 }

 getimg(url: string) {
  if (url) {
   return this.apiurl + url;
  } else {
   return this.apiurl + environment.defaultImgUrl;
  }
 }

 mediaopen(item: any) {
  //   console.log(item);
  this.videoinfo = item;
  this.videomodal = true;
  this.homeService.setcount(item.iDs).subscribe();
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
