import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
 providedIn: 'root',
})
export class NewsService {
 apiUrl = environment.apiUrl + '/api/';
 constructor(private http: HttpClient) {}

 newslist(menuid: any, siteinfo: any, position: any = '', page = 0): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  if (!siteinfo) {
   siteinfo = { site: 'main', lang: 'mn' };
  }
  return this.http.get(
   this.apiUrl + 'news?menuid=' + menuid + '&site=' + siteinfo.site + '&lang=' + siteinfo.lang + '&page=' + page,
   httpOptions
  );
 }

 newsview(newsid: any): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'news/get?id=' + newsid, httpOptions);
 }

 setcount(newsid: any): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'news/setcount?id=' + newsid, httpOptions);
 }

 businesscard(id: any) {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'employees/get?id=' + id, httpOptions);
 }

 count(menuid: any, siteinfo: any) {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'news/count?menuid=' + menuid + '&site=' + siteinfo.site + '&lang=' + siteinfo.lang, httpOptions);
 }

 search(site: any, lang: any, title: any, menuid: any, userid: any, sdate: any, edate: any) {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(
   this.apiUrl +
    'news/search?menuid=' +
    menuid +
    '&title=' +
    encodeURI(title) +
    '&site=' +
    site +
    '&lang=' +
    lang +
    '&userid=' +
    userid +
    '&sdate=' +
    sdate +
    '&edate=' +
    edate,
   httpOptions
  );
 }
}
