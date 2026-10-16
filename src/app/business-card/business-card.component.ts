import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HeaderService } from '../header/header.service';
import { NewsService } from '../shared/news.service';
import { LanguageService } from '../shared/service/language.service';
import { LoaderService } from '../shared/service/loader.service';

@Component({
 selector: 'app-business-card',
 templateUrl: './business-card.component.html',
 styleUrls: ['./business-card.component.scss'],
})
export class BusinessCardComponent implements OnInit {
 site: any;
 lang: any;
 newslist: any;
 imgUrl: string | undefined;
 submenu: any;
 menuId: string | undefined;
 currentMenu: any;
 siteinfo: any;
 parentmenu: any;
 newscount: any;
 businesscard: any;
 apiurl = environment.imgUrl;

 constructor(
  private newsService: NewsService,
  private route: ActivatedRoute,
  private headerService: HeaderService,
  private router: Router,
  private loaderService: LoaderService,
  private sanitizer: DomSanitizer,
  private language: LanguageService
 ) {}

 ngOnInit(): void {
  this.menuId = this.route.snapshot.paramMap.get('id')?.toString();
  this.language.setLanguage();
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
  });
  this.loadSubMenu(this.siteinfo);
  this.language.weblog(this.router.url, this.siteinfo);
 }

 //  loadNews(info: any) {
 //   // this.loaderService.show('');
 //   //   console.log(this.menuId);
 //   this.newsService.newslist(this.menuId, info).subscribe({
 //    next: (result) => {
 //     this.newslist = result;
 //     this.newscount = this.newslist.length;
 //     if (this.newscount <= 1) {
 //      this.loadPage();
 //     }
 //     this.loaderService.hide();
 //     // console.log(this.newscount);
 //    },
 //    error: (error) => {
 //     this.loaderService.hide();
 //    },
 //   });
 //  }

 loadSubMenu(info: any) {
  // this.loaderService.show('');
  this.headerService.sublist(this.menuId, info).subscribe({
   next: (result) => {
    // this.loadNews(this.siteinfo);
    this.loadPage();
    this.loaderService.hide();
    this.submenu = result;
    this.parentmenu = this.submenu ? (this.submenu[0] ? this.submenu[0] : null) : null;
    this.getMenuName(this.menuId);
    // console.log(this.submenu);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 loadPage() {
  // this.loaderService.show('');
  //   const pageid = this.newslist[0]?.pageid ? this.newslist[0].pageid : this.newslist[0]?.iDs;
  this.newsService.businesscard(this.menuId).subscribe({
   next: (result) => {
    this.loaderService.hide();
    if (result) {
     this.businesscard = result;
     //  console.log(this.businesscard);
    } else {
     this.businesscard = {
      iDs: 0,
      picurl: '',
      pictype: '',
      lastname: '',
      firstname: '',
      info: '',
      departmentid: 0,
      department: '',
      managementid: 0,
      management: null,
      email: '',
      phone: '',
      workphone: '',
      workaddress: '',
      ognoo: '',
     };
    }
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
   //  return 'http://www.frc.mn/resource/' + url;
   return this.apiurl + url;
  } else {
   return ''; //'http://www.frc.mn/environment.defaultImgUrl';
  }
 }

 //  getimg(url: string) {
 //   if (url) {
 //    //    return 'https://www.frc.mn/' + url;
 //    return 'http://www.frc.mn/resource/frc/image/2022/02/26/i8p85e2fvp2qxjdh/1-41.png';
 //   } else {
 //    return 'http://www.frc.mn/environment.defaultImgUrl';
 //   }
 //  }

 timelinecolor(indx: any) {
  let color = '';
  if (indx >= 0 && indx <= 5) {
   color = '#ff5600';
  }
  if (indx > 5 && indx <= 10) {
   color = '#ffa705';
  }
  if (indx > 10 && indx <= 15) {
   color = '#12affe';
  }
  if (indx > 15 && indx <= 20) {
   color = '#69e9f2';
  }
  if (indx > 20) {
   color = '#3224e9';
  }
  return color;
 }

 getHTML(html: any) {
  return this.sanitizer.sanitize(SecurityContext.HTML, html);
 }

 link(url: any) {
  window.location.href = url;
 }
}
