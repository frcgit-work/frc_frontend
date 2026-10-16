import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
 providedIn: 'root',
})
export class SliderService {
 apiUrl = environment.apiUrl + '/api/';
 constructor(private http: HttpClient) {}

 slidelist(siteinfo: any, position: any = 'none', stat: any = 'none') {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(
   this.apiUrl + 'slide?site=' + siteinfo.site + '&lang=' + siteinfo.lang + '&position=' + position + '&stat=' + stat,
   httpOptions
  );
 }

 slidehome(menuid: any, siteinfo: any) {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'slide/gethome?site=' + siteinfo.site + '&lang=' + siteinfo.lang + '&menuid=' + menuid, httpOptions);
 }

 bannerlist(siteinfo: any, position: any = '', active: any = 1): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  if (!siteinfo) {
   siteinfo = { site: 'main', lang: 'mn' };
  }
  let addstring = '';
  if (position != '') {
   addstring = '&position=' + position;
  }
  return this.http.get(
   this.apiUrl + 'banner?site=' + siteinfo.site + '&lang=' + siteinfo.lang + addstring + '&stat=active&active=' + active,
   httpOptions
  );
 }
}
