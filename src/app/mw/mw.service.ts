import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
 providedIn: 'root',
})
export class MWService {
 apiUrl = environment.apiUrl + '/api/';
 constructor(private http: HttpClient) {}

 decision(sctId: any, decId: any): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'frc/decision?sctId=' + sctId + '&decId=' + decId, httpOptions);
 }
 entity(id: any, otid: any): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'frc/entity?id=' + id + '&otid=' + otid, httpOptions);
 }

 orgdetails(id: any): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'frc/orgdetails?id=' + id, httpOptions);
 }
 stakeholder(id: any): Observable<any> {

  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post(this.apiUrl + 'tabinfo/stakeholder?register=' + id,null, httpOptions);
  }
  tuz(id: any): Observable<any> {
  const httpOptions = {}; //{ headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post(environment.licenseUrl + 'token/tuz?register=' + id,null, httpOptions);
  }
product(id: any): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post(this.apiUrl + 'tabinfo/product?register=' + id,null, httpOptions);
}
branch(id: any): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post(this.apiUrl + 'tabinfo/branch?register=' + id,null, httpOptions);
}
 oldorgdetail(id: any): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'frc/olddetails?id=' + id, httpOptions);
 }

 menuitem(id: any) {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'menu/getmenu?id=' + id, httpOptions);
 }

 enotice(sctId: any): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'frc/enotice?id=' + sctId, httpOptions);
 }

 //  Insurnaces
 bankbroker(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'insurance/bankbroker', httpOptions);
 }
 damage(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'insurance/damageassesor', httpOptions);
 }
 insurance(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'insurance/insurance', httpOptions);
 }
 insuranceactuarian(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'insurance/insuranceactuarian', httpOptions);
 }
 insurancebroker(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'insurance/insurancebroker', httpOptions);
 }
 longinsurance(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'insurance/longinsurance', httpOptions);
 }
 reinsurance(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'insurance/reinsurance', httpOptions);
 }
 deactive(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'insurance/deactivereprensentative', httpOptions);
 }
 insreprensentative(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'insurance/insreprensentative', httpOptions);
 }
 lawcompany(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'insurance/lawcompany', httpOptions);
 }
 apprcompany(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'insurance/apprcompany', httpOptions);
 }
 auditcompany(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'insurance/auditcompany', httpOptions);
 }
 miningexchange(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'insurance/miningexchange', httpOptions);
 }

 //  Securities
 custodian(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'securitie/custodian', httpOptions);
 }
 haab(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'securitie/haab', httpOptions);
 }
 hbuts(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'securitie/hbuts', httpOptions);
 }
 hiu(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'securitie/hiu', httpOptions);
 }
 homk(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'securitie/homk', httpOptions);
 }
 secbroker(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'securitie/secbroker', httpOptions);
 }
 dealer(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'securitie/dealer', httpOptions);
 }
 underwriter(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'securitie/underwriter', httpOptions);
 }
 hoz(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'securitie/hoz', httpOptions);
 }
 nominal(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'securitie/nominal', httpOptions);
 }
 fst(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'securitie/fst', httpOptions);
 }
 mining(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'securitie/mining', httpOptions);
 }
 zereglel(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'securitie/zereglel', httpOptions);
 }

 nbfi(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'frc/nbfi', httpOptions);
 }

 person(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'person', httpOptions);
 }

 //  Realestate ul hudluh
 realestate_deactive(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(this.apiUrl + 'realestate/deactive', httpOptions);
 }
}
