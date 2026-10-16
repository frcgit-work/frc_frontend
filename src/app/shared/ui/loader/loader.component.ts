import { Component, OnInit } from '@angular/core';
import { LoaderModel } from '../../models/loader-model';
import { LoaderService } from '../../service/loader.service';

@Component({
 selector: 'app-loader',
 templateUrl: './loader.component.html',
 styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
 loader: LoaderModel;
 constructor(private loaderService: LoaderService) {
  this.loader = {
   show: false,
   message: '.',
  };
  this.loaderService.loadState.subscribe((result) => {
   if (result) {
    // console.log(result);
    this.loader.show = result.show;
    this.loader.message = result.message;
   }
  });
 }

 ngOnInit(): void {}
}
