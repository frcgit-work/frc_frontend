import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
 providedIn: 'root',
})
export class FaqService {
 apiUrl = environment.apiUrl + '/api/';
 constructor(private http: HttpClient) {}

 doclist(menuid: any, siteinfo: any, position: any = ''): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  if (!siteinfo) {
   siteinfo = { site: 'main', lang: 'mn' };
  }
  return this.http.get(this.apiUrl + 'faq?menuid=' + menuid + '&site=' + siteinfo.site + '&lang=' + siteinfo.lang, httpOptions);
 }
}
