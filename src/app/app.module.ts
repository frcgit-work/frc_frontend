import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { LightboxModule } from 'ngx-lightbox';
import { LoaderModule } from './shared/ui/loader/loader.module';
import { DocRoutingModule } from './doc/doc-routing.module';
import { SectorComponent } from './sector/sector.component';
import { OrgsComponent } from './sector/component/orgs/orgs.component';
import { DecreeComponent } from './sector/component/decree/decree.component';
import { MembersComponent } from './members/members.component';
import { BusinessCardComponent } from './business-card/business-card.component';
import { StockExchangeComponent } from './home/component/stock-exchange/stock-exchange.component';
import { ReportComponent } from './home/component/report/report.component';
import { VideoComponent } from './home/component/video/video.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { FeedbackComponent } from './feedback/feedback.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoViewComponent } from './video-view/video-view.component';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DatePipe } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { MainComponent } from './main/main.component';
import { FaqComponent } from './faq/faq.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SafeHtmlPipe } from './shared/service/safe-html.pipe';
import { View1Component } from './view1/view1.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartFrameComponent } from './chart-frame/chart-frame.component';
import { SnowComponent } from './shared/ui/snow/snow.component';
import { ChatWidgetComponent } from './chat-widget/chat-widget.component';
// import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
 declarations: [
  AppComponent,
  HeaderComponent,
  FooterComponent,
  //   HomeComponent,
  //   SliderComponent,
  //   PointerContainerComponent,
  //   ChartComponent,
  //   InfoGraphicComponent,
  //   HomeListComponent,
  //   VideoComponent,
  ListComponent,
  ViewComponent,
  SectorComponent,
  OrgsComponent,
  DecreeComponent,
  MembersComponent,
  BusinessCardComponent,
  //   StockExchangeComponent,
  //   ReportComponent,
  //   VideoComponent,
  FeedbackComponent,
  ContactComponent,
  VideoListComponent,
  VideoViewComponent,
  SearchComponent,
  MainComponent,
  FaqComponent,
  ScheduleComponent,
  SafeHtmlPipe,
  View1Component,
  ChartFrameComponent,
  SnowComponent,
  ChatWidgetComponent
 ],
 imports: [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  //   CarouselModule,
  //   GoogleChartsModule,
  BrowserAnimationsModule,
  //   NgChartsModule,
  LightboxModule,
  LoaderModule,
  DocRoutingModule,
  FormsModule,
 ],
 providers: [DatePipe, SafeHtmlPipe],
 schemas: [CUSTOM_ELEMENTS_SCHEMA],
 bootstrap: [AppComponent],
})
export class AppModule {}
