import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from 'src/app/doc/document.service';
import { HeaderService } from 'src/app/header/header.service';
import { MWService } from 'src/app/mw/mw.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { environment } from 'src/environments/environment';

@Component({
 selector: 'app-org-detail',
 templateUrl: './org-detail.component.html',
 styleUrls: ['./org-detail.component.scss'],
})
export class OrgDetailComponent implements OnInit {
 menuId: string | undefined;
 orgdetails: any;
 siteinfo: any;
 submenu: any;
 parentmenu: any;
 currentMenu: any;
 decmenu: any;
 orgtypeId: any;
 menuname: any;
 stakeholder: any;
 stakeholdername: any;
 tuz: any;
 tuzname: any;
 tab=1;
 tabname: any;
 product: any;
 productname: any;
 licenseUrl = environment.licenseUrl;
   branch: any;
   branchname: any;
 constructor(
  private mwService: MWService,
  private loaderService: LoaderService,
  private route: ActivatedRoute,
  private sanitizer: DomSanitizer,
  private headerService: HeaderService
 ) {}

 ngOnInit(): void {
  this.menuId = this.route.snapshot.paramMap.get('id')?.toString();
  this.orgtypeId = localStorage.getItem('orgtypeid');

  // this.loaderService.show('');
  this.mwService.menuitem(this.orgtypeId ? this.orgtypeId : 0).subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.decmenu = result;
    this.mwService.orgdetails(this.menuId ? this.menuId : 0).subscribe({
     next: async (result) => {
      this.loaderService.hide();
      this.orgdetails = result;
      await this.loadStakeholder();
      await this.loadTuz();
      await this.loadProduct();
      await this.loadBranch();
      this.menuname = this.orgdetails ? this.orgdetails.financial_activities_name : 'Ерөнхий мэдээлэл';
      this.tabname= 'Ерөнхий мэдээлэл';
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

 loadStakeholder() {
    this.mwService.stakeholder(this.menuId ? this.menuId : 0).subscribe({
        next: (result) => {
         console.log('result', result);
         this.loaderService.hide();
         this.stakeholder = result;
         this.stakeholdername = this.stakeholder.length>0 ? 'Хувьцаа эзэмшигчид': null;
        },
        error: (error) => {
         this.loaderService.hide();
        },
    });
 }
 loadTuz() {
    this.mwService.tuz(this.menuId ? this.menuId : 0).subscribe({
        next: (result) => {
         console.log('result', result);
         this.loaderService.hide();
         this.tuz = result;
         this.tuzname = this.tuz.length > 0 ? 'ТУЗ': null;
        },
        error: (error) => {
         console.log('error', error);
         this.loaderService.hide();
        },
    });
 }
 loadProduct() {
   this.mwService.product(this.menuId ? this.menuId : 0).subscribe({
       next: (result) => {
        this.loaderService.hide();
        this.product = result;
        this.productname = this.product.length>0 ? 'Бүтээгдэхүүн': null;
       },
       error: (error) => {
        this.loaderService.hide();
       },
   });
}

loadBranch() {
   this.mwService.branch(this.menuId ? this.menuId : 0).subscribe({
       next: (result) => {
        this.loaderService.hide();
        this.branch = result;
        this.branchname = this.branch.length>0 ? 'Салбар': null;
       },
       error: (error) => {
        this.loaderService.hide();
       },
   });
}

 onTab(index:any, name:any){
    this.tab = index;
    this.tabname = name;
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

 getUrl(html: any) {
   return this.licenseUrl + html;
  }
}
