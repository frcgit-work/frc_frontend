import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
 providedIn: 'root',
})
export class HeaderService {
 apiUrl = environment.apiUrl + '/api/';
 constructor(private http: HttpClient) {}

 menulist(siteinfo: any, position: any): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  if (!siteinfo) {
   siteinfo = { site: 'main', lang: 'mn' };
  }
  let addstring = '';
  if (position != '') {
   addstring = '&position=' + position;
  }
  addstring += '&status=1';

  return this.http.get(this.apiUrl + 'menu?site=' + siteinfo.site + '&lang=' + siteinfo.lang + addstring, httpOptions);
 }

 sublist(id: any, siteinfo: any, position: any = ''): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  if (!siteinfo) {
   siteinfo = { site: 'main', lang: 'mn' };
  }
  let addstring = '';
  if (position != '') {
   addstring = '&position=' + position;
  }
  addstring += '&status=1';
  return this.http.get(
   this.apiUrl + 'menu/getsubmenu?id=' + (id ? id : 0) + '&site=' + siteinfo.site + '&lang=' + siteinfo.lang + addstring,
   httpOptions
  );
 }

 parentlist(id: any, siteinfo: any, position: any = ''): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  if (!siteinfo) {
   siteinfo = { site: 'main', lang: 'mn' };
  }
  let addstring = '';
  if (position != '') {
   addstring = '&position=' + position;
  }
  addstring += '&status=1';
  return this.http.get(
   this.apiUrl + 'menu/getparent?id=' + (id ? id : 0) + '&site=' + siteinfo.site + '&lang=' + siteinfo.lang + addstring,
   httpOptions
  );
 }

 parentsublist(id: any, siteinfo: any, position: any = ''): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  if (!siteinfo) {
   siteinfo = { site: 'main', lang: 'mn' };
  }
  let addstring = '';
  if (position != '') {
   addstring = '&position=' + position;
  }
  addstring += '&status=1';
  return this.http.get(
   this.apiUrl + 'menu/getparentsub?id=' + (id ? id : 0) + '&site=' + siteinfo.site + '&lang=' + siteinfo.lang + addstring,
   httpOptions
  );
 }

 sociallist(siteinfo: any, status: any = ''): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  if (!siteinfo) {
   siteinfo = { site: 'main', lang: 'mn' };
  }
  let addstring = '';
  if (status != '') {
   addstring = '&status=' + status;
  }
  return this.http.get(this.apiUrl + 'socialmedia?site=' + siteinfo.site + '&lang=' + siteinfo.lang + addstring, httpOptions);
 }

 pagelist(pageid: any) {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'page?pageid=' + pageid, httpOptions);
 }

 pagestyle(userinfo: any, styleid: any) {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'page/style?site=' + userinfo.site + '&lang=' + userinfo.lang + '&styleid=' + styleid, httpOptions);
 }

 piclist(pageid: any) {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'newsslide?pageid=' + pageid, httpOptions);
 }

 currencylist() {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.get(this.apiUrl + 'currency', httpOptions);
  var datePipe = new Date();
  var startdate = datePipe.getFullYear() + '-01-01';
  var enddate = datePipe.getFullYear() + '-' + this.monthcheck(datePipe.getMonth() + 1) + '-' + this.monthcheck(datePipe.getDate());
  return this.http.post('https://www.mongolbank.mn/mn/currency-rate/data?startDate=' + startdate + '&endDate=' + enddate, httpOptions);
 }

 monthcheck(month: any) {
  if (month < 10) {
   return '0' + month.toString();
  } else return month;
 }
}
