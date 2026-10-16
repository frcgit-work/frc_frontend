import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DocumentService } from '../doc/document.service';
import { HeaderService } from '../header/header.service';
import { MWService } from '../mw/mw.service';
import { NewsService } from '../shared/news.service';
import { LoaderService } from '../shared/service/loader.service';

@Component({
 selector: 'app-sector',
 templateUrl: './sector.component.html',
 styleUrls: ['./sector.component.scss'],
})
export class SectorComponent implements OnInit {
 site: any;
 lang: any;
 newslist: any;
 imgUrl: string | undefined;
 parent: any;
 parentsub: any;
 menuId: string | undefined;
 currentMenu: any;
 siteinfo: any;
 parentmenu: any;
 newscount: any;
 sublist: any;
 list: any;
 constructor(
  private mwService: MWService,
  private route: ActivatedRoute,
  private headerService: HeaderService,
  private router: Router,
  private loaderService: LoaderService,
  private sanitizer: DomSanitizer
 ) {}

 ngOnInit(): void {
  this.menuId = this.route.snapshot.paramMap.get('id')?.toString();
  this.siteinfo = JSON.parse(localStorage.getItem('siteinfo')!);
  if (!this.siteinfo) {
   this.siteinfo = { lang: 'mn', site: 'main' };
  }

  this.imgUrl = environment.apiUrl;
  this.loadSubMenu(this.siteinfo);
  this.loadOrgs(this.siteinfo);
 }

 loadSubMenu(info: any) {
  // this.loaderService.show('');
  this.headerService.sublist(this.menuId, info).subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.sublist = result;
    this.parentmenu = this.sublist ? (this.sublist[0] ? this.sublist[0] : null) : null;
    this.getMenuName(this.menuId);
    this.parent = this.sublist?.filter((x: { parentid: number }) => x.parentid === Number(this.menuId));
    this.loadParentSubMenu(this.siteinfo);

    // console.log(this.parent);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 loadOrgs(info: any) {
  // this.loaderService.show('');
  //   console.log(this.menuId);
  this.mwService.entity(this.menuId, 0).subscribe({
   next: (result) => {
    this.list = result;
    // console.log(this.list);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 //  loadParentMenu(info: any) {
 //   // this.loaderService.show('');
 //   this.headerService.parentlist(this.menuId, info).subscribe({
 //    next: (result) => {
 //     this.loaderService.hide();
 //     this.parent = result;
 //     console.log(this.parent);
 //     this.loadParentSubMenu(this.siteinfo);
 //    },
 //    error: (error) => {
 //     this.loaderService.hide();
 //    },
 //   });
 //  }

 loadParentSubMenu(info: any) {
  // this.loaderService.show('');
  this.headerService.parentsublist(this.menuId, info).subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.parentsub = result;
    // console.log(this.parentsub);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 get_parent(menuid: number) {
  return this.parentsub?.filter((x: { parentid: number }) => x.parentid === menuid);
 }

 get_parent_count(menuid: number) {
  return this.parentsub?.filter((x: { parentid: number }) => x.parentid === menuid).length;
 }

 getMenuName(menuId: any) {
  this.currentMenu = this.sublist.filter((x: { iDs: any }) => x.iDs == menuId);
  //   console.log(this.submenu);
  //   console.log(this.menuId);
 }

 getimg(url: string) {
  if (url) {
   //    return 'https://www.frc.mn/' + url;
   return 'http://www.frc.mn/resource/frc/image/2022/02/26/i8p85e2fvp2qxjdh/1-41.png';
  } else {
   return 'http://www.frc.mn/environment.defaultImgUrl';
  }
 }

 getHTML(html: any) {
  return this.sanitizer.sanitize(SecurityContext.HTML, html);
 }

 getUrl(html: any) {
  return 'http://www.frc.mn/resource/' + html;
 }
}
