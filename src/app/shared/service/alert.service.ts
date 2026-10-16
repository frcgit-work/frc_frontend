import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AlertType } from '../enums/alert-type';
import { AlertModel } from '../models/alert-model';

@Injectable({
 providedIn: 'root',
})
export class AlertService {
 private loadCount: number = 0;
 emptyAlert: AlertModel = {
  show: false,
  type: AlertType.Default,
  title: '',
  message: '',
 };
 loadState: BehaviorSubject<AlertModel> = new BehaviorSubject<AlertModel>(this.emptyAlert);

 show(type: AlertType, title: string, message: string) {
  this.loadCount += 1;
  this.loadState.next({
   show: true,
   type: type,
   title: title,
   message: message,
  });
 }

 hide() {
  this.loadCount = this.loadCount ? --this.loadCount : 0;
  if (!this.loadCount) this.loadState.next(this.emptyAlert);
 }
}
