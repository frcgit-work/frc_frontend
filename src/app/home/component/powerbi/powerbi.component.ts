import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/shared/service/language.service';
import { HomeService } from '../../home.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
 selector: 'app-powerbi',
 templateUrl: './powerbi.component.html',
 styleUrls: ['./powerbi.component.scss'],
})
export class PowerbiComponent implements OnInit {
 siteinfo: any;
 list:any = [];
 tabid: any;
 taburl: any;
 loading = 'Уншиж байна';
 constructor(private language: LanguageService, private powerbi: HomeService, private loaderService: LoaderService, private sanitizer: DomSanitizer) {}

 ngOnInit(): void {
  this.language.setLanguage();
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
  });
  this.load();
  this.taburl ='https://app.powerbi.com/view?r=eyJrIjoiNDM4NjVhZDctZTI1Ny00MTI3LWI1NjMtZDUwMjU5OGU1MTRlIiwidCI6IjZjZmEwMzAzLWQwYTEtNDYwNy1hOGIwLWRhYzMwYzUwNmYwOSIsImMiOjEwfQ%3D%3D';
 }

 load() {
    // this.loaderService.show('');
    this.powerbi.powerbi(this.siteinfo).subscribe({
     next: (result) => {
      this.loaderService.hide();
      const list: any[] = JSON.parse(JSON.stringify(result));
      this.list = list;
      this.tab(list?list[0]??null:null);
     },
     error: (error) => {
      this.loaderService.hide();
     },
    });
   }

   tab(item:any) {
      this.tabid = item.iDs;
      this.taburl = item.url;
   }

   embedUrl(url: any) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
   }
}
