import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../shared/service/language.service';

@Component({
 selector: 'app-home',
 templateUrl: './home.component.html',
 styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
 constructor(private route: ActivatedRoute, private http: HttpClient, private language: LanguageService, private router: Router) {}

 ngOnInit(): void {
  const lang = this.route.snapshot.paramMap.get('lang')?.toString();
  const siteinfo = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('siteinfo'))));
  if (lang) {
   localStorage.setItem('siteinfo', JSON.stringify({ site: 'main', lang: lang }));
   this.language.setLanguage();
  } else {
   if (!siteinfo) {
    this.getIPAddress();
   } else {
    this.language.setLanguage();
   }
  }
  this.language.weblog(this.router.url, siteinfo);
 }

 //  getIpAddress() {
 //   return this.http.get('https://api.ipify.org/?format=json');
 //  }

 getIPAddress() {
  this.http.get('https://api.ipify.org/?format=json').subscribe((res: any) => {
   this.loadIp(res.ip);
  });
 }

 loadIp(ipaddress: any) {
  //let headers = new HttpHeaders();
  let url = 'https://ip-api.com/json/' + ipaddress;
  return this.http.get(url).subscribe((res: any) => {
   if (res.countryCode === 'MN') {
    localStorage.setItem('siteinfo', JSON.stringify({ site: 'main', lang: 'mn' }));
    this.language.setLanguage();
   } else {
    localStorage.setItem('siteinfo', JSON.stringify({ site: 'main', lang: 'en' }));
    this.language.setLanguage();
   }
  });
 }
}
