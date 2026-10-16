import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/header/header.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { environment } from 'src/environments/environment';
import { MWService } from '../../mw.service';

@Component({
 selector: 'app-decision',
 templateUrl: './decision.component.html',
 styleUrls: ['./decision.component.scss'],
})
export class DecisionComponent implements OnInit {
 site: any;
 lang: any;
 list: any;
 imgUrl: string | undefined;
 submenu: any;
 menuId: string | undefined;
 currentMenu: any;
 siteinfo: any;
 parentmenu: any;
 constructor(
  private mwService: MWService,
  private route: ActivatedRoute,
  private headerService: HeaderService,
  private router: Router,
  private loaderService: LoaderService,
  private sanitizer: DomSanitizer,
  private language: LanguageService
 ) {}

 ngOnInit(): void {
  this.menuId = this.route.snapshot.paramMap.get('id')?.toString();
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.setLanguage();
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
  });
  this.loadSubMenu(this.siteinfo);
  this.language.weblog(this.router.url, this.siteinfo);

  this.imgUrl = environment.apiUrl;
 }

 loadNews(info: any) {
  // this.loaderService.show('');
  //   console.log(this.menuId);
  const decYear = this.parentmenu.menuname.split(' ')[0];
  this.mwService.decision(this.menuId ? this.menuId : 0, decYear ? decYear : 0).subscribe({
   next: (result) => {
    this.list = result;
    console.log(this.list);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 loadSubMenu(info: any) {
  // this.loaderService.show('');
  this.headerService.sublist(this.menuId, info).subscribe({
   next: (result) => {
    this.loadNews(this.siteinfo);
    this.loaderService.hide();
    this.submenu = result;
    this.parentmenu = this.submenu ? (this.submenu[0] ? this.submenu[0] : null) : null;
    this.getMenuName(this.menuId ? this.menuId : 0);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 get_parent(menuid: number) {
  return this.submenu?.filter((x: { parentid: number }) => x.parentid === menuid);
 }

 get_parent_count(menuid: number) {
  //   console.log(menuid);
  //   console.log(this.submenu?.filter((x: { parentid: number }) => x.parentid === menuid));
  return this.submenu?.filter((x: { parentid: number }) => x.parentid === menuid).length;
 }

 getMenuName(menuId: any) {
  this.currentMenu = this.submenu.filter((x: { iDs: any }) => Number(x.iDs) === Number(menuId));
  this.currentMenu = this.currentMenu ? (this.currentMenu[0] ? this.currentMenu[0] : null) : null;
 }

 getimg(url: string) {
  if (url) {
   //    return 'https://www.frc.mn/' + url;
   return 'http://www.frc.mn/resource/frc/image/2022/02/26/i8p85e2fvp2qxjdh/1-41.png';
  } else {
   return 'http://www.frc.mn/environment.defaultImgUrl';
  }
 }

 getUrl(html: any) {
  return 'http://www.frc.mn/resource/' + html;
 }

 link(url: any) {
  window.location.href = url;
 }
}
