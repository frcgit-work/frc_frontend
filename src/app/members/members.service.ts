import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
 providedIn: 'root',
})
export class MembersService {
 apiUrl = environment.apiUrl + '/api/';
 constructor(private http: HttpClient) {}

 managementlist(siteinfo: any): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  if (!siteinfo) {
   siteinfo = { site: 'main', lang: 'mn' };
  }
  let addstring = '';

  return this.http.get(this.apiUrl + 'management?site=' + siteinfo.site + '&lang=' + siteinfo.lang + addstring, httpOptions);
 }

 employeelist(siteinfo: any): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  if (!siteinfo) {
   siteinfo = { site: 'main', lang: 'mn' };
  }
  let addstring = '';

  return this.http.get(this.apiUrl + 'employees?site=' + siteinfo.site + '&lang=' + siteinfo.lang + addstring, httpOptions);
 }
}
