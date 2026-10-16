import { Component, OnInit } from '@angular/core';
import { AlertType } from '../../enums/alert-type';
import { AlertModel } from '../../models/alert-model';
import { AlertService } from '../../service/alert.service';

@Component({
 selector: 'app-alert',
 templateUrl: './alert.component.html',
 styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
 alert: AlertModel;
 AlertTypeEnum = AlertType;
 constructor(private service: AlertService) {
  this.alert = {
   show: false,
   type: AlertType.Default,
   title: '',
   message: '',
  };
  this.service.loadState.subscribe((result) => {
   if (result) {
    this.alert.show = result.show;
    this.alert.type = result.type;
    this.alert.title = result.title;
    this.alert.message = result.message;
    // console.log(this.AlertTypeEnum.Success);
    if (this.alert.show) {
     if (this.alert.type === this.AlertTypeEnum.Success) {
      setTimeout(() => {
       this.close();
      }, 5000);
     }
    }
   }
  });
 }

 ngOnInit(): void {}

 close() {
  this.service.hide();
 }
}
