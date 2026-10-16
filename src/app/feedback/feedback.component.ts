import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HeaderService } from '../header/header.service';
import { AlertType } from '../shared/enums/alert-type';
import { NewsService } from '../shared/news.service';
import { AlertService } from '../shared/service/alert.service';
import { LanguageService } from '../shared/service/language.service';
import { LoaderService } from '../shared/service/loader.service';
import { FeedbackService } from './feedback.service';

@Component({
 selector: 'app-feedback',
 templateUrl: './feedback.component.html',
 styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
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
 pagelist: any;
 alerttip: any;
 alert: any = { show: false, title: '', info: '' };
 loading: boolean = false;
 feedback: any = {
  name: '',
  feed_less: '',
  feed_more: '',
  address: '',
  phone: '',
  email: '',
  orgid: 0,
  site: 'main',
  lang: 'mn',
  ipaddr: '',
 };
 loadingtext: string = '';
 ipAddress: any;
 retval = false;
 constructor(
  private feedbackService: FeedbackService,
  private route: ActivatedRoute,
  private headerService: HeaderService,
  private router: Router,
  private alertService: AlertService,
  private loaderService: LoaderService,
  private sanitizer: DomSanitizer,
  private http: HttpClient,
  private language: LanguageService
 ) {}

 ngOnInit(): void {
  //   console.log('sdfsdfsd');
  this.menuId = this.route.snapshot.paramMap.get('id')?.toString();
  this.language.setLanguage();
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
  });
  this.loadSubMenu(this.siteinfo);

  this.imgUrl = environment.apiUrl;
  this.getIPAddress();
 }

 loadSubMenu(info: any) {
  // this.loaderService.show('');
  this.headerService.sublist(1, info).subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.submenu = result;
    this.parentmenu = this.submenu ? (this.submenu[0] ? this.submenu[0] : null) : null;
    this.getMenuName(this.menuId);
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

 validation() {
  this.retval = false;
  if (this.feedback.name || this.feedback.name != '') {
   this.retval = true;
  } else {
   this.retval = false;
   this.alerttip = 'Өргөдөл гаргагчийн нэр оруулна уу';
   return;
  }
  if (this.feedback.feed_less || this.feedback.feed_less != '') {
   this.retval = true;
  } else {
   this.retval = false;
   this.alerttip = 'Өргөдлийн товч утга оруулна уу';
   return;
  }
  if (this.feedback.feed_more || this.feedback.feed_more != '') {
   this.retval = true;
  } else {
   this.retval = false;
   this.alerttip = 'Өргөдлийн агуулга оруулна уу';
   return;
  }
  if (this.feedback.address || this.feedback.address != '') {
   this.retval = true;
  } else {
   this.retval = false;
   this.alerttip = 'Оршин суугаа газрын хаяг оруулна уу';
   return;
  }
  if (this.feedback.phone || this.feedback.phone != '') {
   this.retval = true;
  } else {
   this.retval = false;
   this.alerttip = 'Утасны дугаар оруулна уу';
   return;
  }
  if (this.feedback.email || this.feedback.email != '') {
   this.retval = true;
  } else {
   this.retval = false;
   this.alerttip = 'Мэйл хаяг оруулна уу';
   return;
  }
  if (this.feedback.orgid != 0) {
   this.retval = true;
  } else {
   this.retval = false;
   this.alerttip = 'Зохицуулалтын салбар сонгоно уу';
   return;
  }
 }

 save() {
  this.validation();
  //   console.log('test', this.retval);
  this.feedback.site = this.siteinfo.site;
  this.feedback.lang = this.siteinfo.lang;
  this.feedback.orgid = String(this.feedback.orgid);
  this.feedback.ipaddr = "172.0.0.1";
  this.feedback.ipaddr = this.ipAddress;

  if (this.retval) {
   this.alerttip = null;
   this.loaderService.show(this.loadingtext);
   this.feedbackService.save(this.siteinfo, this.feedback).subscribe(
    (data) => {
     const dd = JSON.parse(JSON.stringify(data));
     // this.alertService.show(AlertType.Success, '', dd.msg);
     this.alert.show = true;
     this.alert.title = 'Танд баярлалаа';
     this.alert.info = 'Таны өргөдлийг амжилттай хүлээж авлаа.';
     this.loaderService.hide();
    },
    (error) => {
     this.loaderService.hide();
    }
   );
  }
 }

 getIPAddress() {
  this.http.get('https://api.ipify.org/?format=json').subscribe((res: any) => {
   this.ipAddress = res.ip;
  });
 }
}
