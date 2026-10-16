import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as shajs from 'sha.js';

@Injectable({
 providedIn: 'root',
})
export class FeedbackService {
 apiUrl = environment.apiUrl + '/api/';
 constructor(private http: HttpClient) {}

 save(siteinfo: any, item: any): Observable<any> {
  const token = shajs('sha256').update('feedback_insert_S@d_tech').digest('hex');
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  if (!siteinfo) {
   siteinfo = { site: 'main', lang: 'mn' };
  }

  return this.http.post(this.apiUrl + 'feedback?token=' + token, item, httpOptions);
 }
}
