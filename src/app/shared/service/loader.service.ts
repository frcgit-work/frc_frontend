import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderModel } from '../models/loader-model';

@Injectable({
 providedIn: 'root',
})
export class LoaderService {
 hiddenLoader: LoaderModel = {
  show: false,
  message: '.',
 };
 loadState: BehaviorSubject<LoaderModel> = new BehaviorSubject<LoaderModel>(this.hiddenLoader);

 show(message: string) {
  this.loadState.next({
   show: true,
   message: message,
  });
 }

 hide() {
  this.loadState.next(this.hiddenLoader);
 }
}
