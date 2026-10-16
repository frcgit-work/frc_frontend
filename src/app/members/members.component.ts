import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HeaderService } from '../header/header.service';
import { NewsService } from '../shared/news.service';
import { LanguageService } from '../shared/service/language.service';
import { LoaderService } from '../shared/service/loader.service';
import { MembersService } from './members.service';

@Component({
 selector: 'app-members',
 templateUrl: './members.component.html',
 styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
 site: any;
 lang: any;
 management: any;
 imgUrl: string | undefined;
 submenu: any;
 menuId: string | undefined;
 currentMenu: any;
 siteinfo: any;
 parentmenu: any;
 newscount: any;
 pagelist: any;
 employee: any;
 apiurl = environment.imgUrl;
 //  modalshow = false;
 //  firstname: any;
 //  lastname: any;
 //  info: any;
 //  picurl: any;
 memberinfo = { show: false, firstname: '', lastname: '', info: '', picurl: '' };
 constructor(
  private membersService: MembersService,
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

 loadManagement(info: any) {
  // this.loaderService.show('');
  this.membersService.managementlist(this.siteinfo).subscribe({
   next: (result) => {
    this.management = result;
    this.loadEmployee(info);
    this.loaderService.hide();
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 loadEmployee(info: any) {
  // this.loaderService.show('');
  this.membersService.employeelist(info).subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.employee = result;
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 filterEmployee(id: any) {
  return this.employee?.filter((x: { managementid: any }) => x.managementid === id);
 }

 loadSubMenu(info: any) {
  // this.loaderService.show('');
  this.headerService.sublist(this.menuId, info).subscribe({
   next: (result) => {
    this.loadManagement(this.siteinfo);
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

 get_parent_main(menu: any) {
  var data;
  if (menu?.parentid === 0) {
   data = this.submenu?.filter((x: { parentid: number }) => (x.parentid === menu.iDs ? menu.iDs : 0));
  } else {
   data = this.submenu?.filter((x: { parentid: number }) => x.parentid === menu.parentid);
  }
  return data;
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
   return this.apiurl + url;
  } else {
   return this.apiurl + environment.defaultImgUrl;
  }
 }

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

 showmodal(item: any) {
  this.memberinfo.show = true;
  this.memberinfo.picurl = item.picurl;
  this.memberinfo.lastname = item.lastname;
  this.memberinfo.firstname = item.firstname;
  this.memberinfo.info = item.info;
 }

 link(url: any) {
  window.location.href = url;
 }
}
