import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    apiUrl = environment.apiUrl + '/api/';
    constructor(private http: HttpClient) { }

    chartlist(siteinfo: any, position: any = 'none', stat: any = 'none') {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get(this.apiUrl + 'chart?site=' + siteinfo.site + '&lang=' + siteinfo.lang + '&status=' + stat, httpOptions);
    }
    chartitem(siteinfo: any, stat: any = 'none', chartId: any = '0') {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get(
            this.apiUrl + 'chartitem?site=' + siteinfo.site + '&lang=' + siteinfo.lang + '&status=' + stat + '&chartId=' + chartId,
            httpOptions
        );
    }
    chartvalue(siteinfo: any, stat: any = 'none', chartId: any = '0') {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get(
            this.apiUrl + 'chartvalue?site=' + siteinfo.site + '&lang=' + siteinfo.lang + '&status=' + stat + '&chartId=' + chartId,
            httpOptions
        );
    }

    chartdata(siteinfo: any, stat: any = 'none', chartId: any = '0') {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get(
            this.apiUrl + 'chartdata?site=' + siteinfo.site + '&lang=' + siteinfo.lang + '&status=' + stat + '&chartId=' + chartId,
            httpOptions
        );
    }

    infograp(siteinfo: any, stat: any = 'none', chartId: any = '0') {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get(
            this.apiUrl + 'chartvalue?site=' + siteinfo.site + '&lang=' + siteinfo.lang + '&status=' + stat + '&chartId=' + chartId,
            httpOptions
        );
    }

    videolist(menuid: any, siteinfo: any, status: any = 'none') {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get(
            this.apiUrl + 'video?site=' + siteinfo.site + '&lang=' + siteinfo.lang + '&status=' + status + '&menuid=' + menuid,
            httpOptions
        );
    }

    videoview(id: any) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get(this.apiUrl + 'video/get?id=' + id, httpOptions);
    }

    setcount(id: any) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get(this.apiUrl + 'video/setcount?id=' + id, httpOptions);
    }

    powerbi(siteinfo: any) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get(this.apiUrl + 'powerbi?site=' + siteinfo.site + '&lang=' + siteinfo.lang, httpOptions);
    }
}
