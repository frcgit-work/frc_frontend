import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
 providedIn: 'root',
})
export class ScheduleService {
 apiUrl = environment.apiUrl + '/api/';
 constructor(private http: HttpClient) {}

 doclist(menuid: any, siteinfo: any, position: any = ''): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  if (!siteinfo) {
   siteinfo = { site: 'main', lang: 'mn' };
  }
  return this.http.get(this.apiUrl + 'schedule?site=' + siteinfo.site + '&lang=' + siteinfo.lang + '&status=active', httpOptions);
 }

 typelist(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'scheduletype?status=active', httpOptions);
 }
 repeatlist(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'schedulerepeat?status=active', httpOptions);
 }
}
