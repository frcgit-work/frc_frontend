import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
 providedIn: 'root',
})
export class LanguageService {
 loadLang: BehaviorSubject<any> = new BehaviorSubject<any>('mn');
 apiUrl = environment.apiUrl + '/api/';
 constructor(private http: HttpClient) {}

 public setLanguage() {
  const siteinfo = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('siteinfo'))));
  if (siteinfo) {
   this.loadLang.next(siteinfo.lang);
  } else {
   this.loadLang.next('mn');
  }
 }

 public weblog(url: any, siteinfo: any) {
  this.getIPAddress(url, siteinfo);
 }

 saveaction(item: any) {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post(this.apiUrl + 'weblog/', item, httpOptions);
 }

 getIPAddress(link: any, siteinfo: any) {
  this.http.get('https://api.ipify.org/?format=json').subscribe((res: any) => {
   let url = 'https://ip-api.com/json/' + res.ip;
   return this.http.get(url).subscribe((res1: any) => {
    // console.log(res1);
    const userAgent: string = navigator.userAgent || navigator.vendor || (window as any).opera || undefined;
    const isMobileDevice = (): boolean => {
     const regexs = [/(Android)(.+)(Mobile)/i, /BlackBerry/i, /iPhone|iPod/i, /Opera Mini/i, /IEMobile/i];
     return regexs.some((b) => userAgent.match(b));
    };

    const isTabletDevice = (): boolean => {
     const regex = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/;
     return regex.test(userAgent.toLowerCase());
    };

    const isDesktopDevice = (): boolean => !isMobileDevice() && !isTabletDevice();

    const isDesktop = isDesktopDevice();
    const isMobile = isMobileDevice();
    const isTablet = isTabletDevice();
    const data = isDesktop ? 'Desktop' : isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Unknown';
    const item = {
     link: link,
     ipaddr: res.ip,
     country: res1.country,
     country_short: res1.countryCode,
     browser: this.getBrowserName(),
     timezone: res1.timezone,
     device: data,
     site: siteinfo.site,
     lang: siteinfo.lang,
    };
    this.saveaction(item).subscribe({
     next: (result) => {
      //   console.log(result);
     },
    });
   });
  });
 }
 getBrowserName(): string {
  const agent = window.navigator.userAgent.toLowerCase();
  const browser =
   agent.indexOf('edge') > -1
    ? 'Microsoft Edge'
    : agent.indexOf('edg') > -1
    ? 'Edge'
    : agent.indexOf('opr') > -1
    ? 'Opera'
    : agent.indexOf('chrome') > -1
    ? 'Chrome'
    : agent.indexOf('trident') > -1
    ? 'Internet Explorer'
    : agent.indexOf('firefox') > -1
    ? 'Firefox'
    : agent.indexOf('safari') > -1
    ? 'Safari'
    : 'other';

  return browser;
 }
}
