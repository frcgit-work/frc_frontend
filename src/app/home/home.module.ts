import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SliderComponent } from '../slider/slider.component';
import { PointerContainerComponent } from './component/pointer-container/pointer-container.component';
import { ChartComponent } from './component/chart/chart.component';
import { InfoGraphicComponent } from './component/info-graphic/info-graphic.component';
import { HomeListComponent } from './component/home-list/home-list.component';
import { VideoComponent } from './component/video/video.component';
import { ReportComponent } from './component/report/report.component';
import { StockExchangeComponent } from './component/stock-exchange/stock-exchange.component';
// import { GoogleChartsModule } from 'angular-google-charts';
// import { NgChartsModule } from 'ng2-charts';
import { HeaderComponent } from '../header/header.component';
import { ChartNewComponent } from './component/chart-new/chart-new.component';
import { PowerbiComponent } from './component/powerbi/powerbi.component';

@NgModule({
 declarations: [
  HomeComponent,
  SliderComponent,
  PointerContainerComponent,
  ChartComponent,
  InfoGraphicComponent,
  HomeListComponent,
  VideoComponent,
  ReportComponent,
  StockExchangeComponent,
  ChartNewComponent,
  PowerbiComponent,
 ],
 imports: [CommonModule, HomeRoutingModule],
 schemas: [CUSTOM_ELEMENTS_SCHEMA],
 exports: [
  SliderComponent,
  PointerContainerComponent,
  ChartComponent,
  InfoGraphicComponent,
  HomeListComponent,
  VideoComponent,
  ReportComponent,
  StockExchangeComponent,
 ],
})
export class HomeModule {}
