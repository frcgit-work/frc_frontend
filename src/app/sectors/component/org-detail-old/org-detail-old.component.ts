import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/header/header.service';
import { MWService } from 'src/app/mw/mw.service';
import { LoaderService } from 'src/app/shared/service/loader.service';

@Component({
 selector: 'app-org-detail-old',
 templateUrl: './org-detail-old.component.html',
 styleUrls: ['./org-detail-old.component.scss'],
})
export class OrgDetailOldComponent implements OnInit {
 menuId: string | undefined;
 orgdetails: any;
 siteinfo: any;
 submenu: any;
 parentmenu: any;
 currentMenu: any;
 decmenu: any;
 orgtypeId: any;
 menuname: any;
 constructor(
  private mwService: MWService,
  private loaderService: LoaderService,
  private route: ActivatedRoute,
  private sanitizer: DomSanitizer,
  private headerService: HeaderService
 ) {}

 ngOnInit(): void {
  this.menuId = this.route.snapshot.paramMap.get('id')?.toString();
  //   console.log(this.menuId);
  this.orgtypeId = localStorage.getItem('orgtypeid');

  // this.loaderService.show('');
  this.mwService.menuitem(this.orgtypeId ? this.orgtypeId : 0).subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.decmenu = result;
    this.mwService.oldorgdetail(this.menuId ? this.menuId : 0).subscribe({
     next: (result) => {
      this.loaderService.hide();
      this.orgdetails = result;
      this.menuname = this.orgdetails ? this.orgdetails.financial_activities_name : 'Ерөнхий мэдээлэл';
     },
     error: (error) => {
      this.loaderService.hide();
     },
    });
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
  //   this.loadOrgs(this.menuId);
 }

 //  loadSubMenu(info: any) {
 //   // this.loaderService.show('');
 //   this.headerService.sublist(this.menuId, info).subscribe({
 //    next: (result) => {
 //     this.loaderService.hide();
 //     this.submenu = result;
 //     this.parentmenu = this.submenu ? (this.submenu[0] ? this.submenu[0] : null) : null;
 //     this.getMenuName(this.menuId ? this.menuId : 0);
 //    },
 //    error: (error) => {
 //     this.loaderService.hide();
 //    },
 //   });
 //  }

 getMenuName(menuId: any) {
  this.currentMenu = this.submenu.filter((x: { iDs: any }) => Number(x.iDs) === Number(menuId));
  this.currentMenu = this.currentMenu ? (this.currentMenu[0] ? this.currentMenu[0] : null) : null;
 }

 get_parent(menuid: number) {
  return this.submenu?.filter((x: { parentid: number }) => x.parentid === menuid);
 }

 get_parent_count(menuid: number) {
  //   console.log(menuid);
  //   console.log(this.submenu?.filter((x: { parentid: number }) => x.parentid === menuid));
  return this.submenu?.filter((x: { parentid: number }) => x.parentid === menuid).length;
 }

 loadOrgs(menuId: any) {}
 getHTML(html: any) {
  return this.sanitizer.sanitize(SecurityContext.HTML, html);
 }
}
