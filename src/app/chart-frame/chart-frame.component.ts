import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { LoaderService } from '../shared/service/loader.service';
import { LanguageService } from '../shared/service/language.service';
import { ActivatedRoute } from '@angular/router';

declare var require: any;
var Highcharts = require('highcharts'),
 HighchartsGroupedCategories = require('highcharts-grouped-categories')(Highcharts);

@Component({
 selector: 'app-chart-frame',
 templateUrl: './chart-frame.component.html',
 styleUrls: ['./chart-frame.component.scss'],
})
export class ChartFrameComponent implements OnInit {
 siteinfo: any;
 chart: any;
 chartcount: any;
 charttab: any;
 softMax: any;
 percentage: any;
 chartname: any;
 chartitem: any;
 chartitemid: any;
 chartvalue: any;
 categories: any;
 loading = false;
 tabname: any;
 valueName: any[] = [];
 setseries: any;
 setdata: any;
 menuId: any;
 constructor(
  private homeService: HomeService,
  private loaderService: LoaderService,
  private language: LanguageService,
  private route: ActivatedRoute
 ) {}

 ngOnInit(): void {
  this.menuId = this.route.snapshot.paramMap.get('id')?.toString();
  this.language.setLanguage();
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
  });

  this.loadChart();
 }

 loadChart() {
  // this.loaderService.show('');
  this.homeService.chartlist(this.siteinfo, 'active').subscribe({
   next: (result) => {
    this.loaderService.hide();
    const chart: any[] = JSON.parse(JSON.stringify(result));
    this.chart = chart?.sort((a, b) => (a.iDs !== b.iDs ? (a.iDs < b.iDs ? -1 : 1) : 0));
    this.menuId = this.menuId ? this.menuId : this.chart[0]?.iDs;

    let chartitem = this.chart?.filter((x: any) => Number(x.iDs) === Number(this.menuId));
    chartitem = chartitem ? (chartitem[0] ? chartitem[0] : null) : null;

    this.chartcount = this.chart.length;
    this.charttab = chartitem?.iDs;
    this.softMax = chartitem?.maxvalue;
    this.percentage = chartitem?.ispercentage;
    this.loadChartItem(chartitem?.iDs);
    this.chartname = chartitem?.chartname;
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }
 loadChartItem(chartId: any) {
  // this.loaderService.show('');
  this.homeService.chartitem(this.siteinfo, 'active', chartId).subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.chartitem = JSON.parse(JSON.stringify(result));
    // console.log(this.chartitem);
    this.chartitemid = this.chartitem ? (this.chartitem[0] ? this.chartitem[0].iDs : 0) : 0;
    this.loadChartValue(chartId);
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }
 loadChartValue(chartId: any) {
  // this.loaderService.show('');
  this.homeService.chartdata(this.siteinfo, 'active', chartId).subscribe({
   next: (result) => {
    this.loaderService.hide();
    this.chartvalue = JSON.parse(JSON.stringify(result))
     .sort((a: { chartname: string }, b: { chartname: string }) => (a.chartname !== b.chartname ? (a.chartname < b.chartname ? -1 : 1) : 0))
     .sort((a: { chartitemId: number }, b: { chartitemId: number }) =>
      a.chartitemId !== b.chartitemId ? (a.chartitemId < b.chartitemId ? -1 : 1) : 0
     );
    this.loading = false;
    // console.log(this.chartvalue);
    this.chartvalue?.forEach((x: any) => {
     this.duplicateRemovechartName(x.chartname);
    });
    this.drawChart();
   },
   error: (error) => {
    this.loaderService.hide();
   },
  });
 }

 chartValueCheck1(chartname: any, itemid: any, sessionNumber: any) {
  let data: any;
  switch (Number(sessionNumber)) {
   case 1:
    data = this.chartvalue?.filter((x: any) => x.chartname === chartname && Number(x.itemid) === Number(itemid));
    data = data ? (data[0] ? data[0] : []) : [];
    data = data.session1;
    break;
   case 2:
    data = this.chartvalue?.filter((x: any) => x.chartname === chartname && x.itemid === itemid);
    data = data ? (data[0] ? data[0] : []) : [];
    data = data.session2;
    break;
   case 3:
    data = this.chartvalue?.filter((x: any) => x.chartname === chartname && x.itemid === itemid);
    data = data ? (data[0] ? data[0] : []) : [];
    data = data.session3;
    break;
   case 4:
    data = this.chartvalue?.filter((x: any) => x.chartname === chartname && x.itemid === itemid);
    data = data ? (data[0] ? data[0] : []) : [];
    data = data.session4;
    break;
   default:
    data = [];
    break;
  }
  if (data > 0) {
   return true;
  } else {
   return false;
  }
 }

 tab(item: any) {
  this.loading = true;
  this.chartname = item.chartname;
  this.tabname = 'tab' + item.iDs;
  this.softMax = item.maxvalue;
  if (item.ispercentage === '1') {
   this.percentage = true;
  } else {
   this.percentage = false;
  }

  this.charttab = item.iDs;
  this.loadChartItem(item.iDs);
  // this.chart1?.nativeElement.update();
  //   console.log(this.tabname);
 }

 duplicateRemovechartName(chartname: any) {
  this.valueName.filter((z: any) => z === chartname).length === 0 ? this.valueName.push(chartname) : null;
 }

 drawChart() {
  this.categories = [];
  this.valueName.forEach((item: any) => {
   let setcategories = [];
   if (this.chartValueCheck1(item, this.chartitemid, 1)) {
    setcategories.push('I');
   }
   if (this.chartValueCheck1(item, this.chartitemid, 2)) {
    setcategories.push('II');
   }
   if (this.chartValueCheck1(item, this.chartitemid, 3)) {
    setcategories.push('III');
   }
   if (this.chartValueCheck1(item, this.chartitemid, 4)) {
    setcategories.push('IV');
   }
   this.categories.push({ name: item, categories: setcategories });
  });
  this.setseries = [];

  this.chartitem?.forEach((item: any) => {
   this.setdata = [];
   const data = this.chartvalue?.filter((x: any) => x.itemid === item.iDs);
   data?.forEach((ii: any) => {
    if (ii.session1 > 0) {
     this.setdata.push(ii.session1);
    }
    if (ii.session2 > 0) {
     this.setdata.push(ii.session2);
    }
    if (ii.session3 > 0) {
     this.setdata.push(ii.session3);
    }
    if (ii.session4 > 0) {
     this.setdata.push(ii.session4);
    }
   });

   const series = {
    name: item.chartname,
    color: item.chartcolor,
    type: item.charttype,
    yAxis: item.charttype === 'column' ? 1 : 0,
    tooltip: {
     valueSuffix: '',
    },
    data: this.setdata,
   };

   this.setseries.push(series);
  });
  Highcharts.chart('homechart', {
   chart: {
    // zoomType: 'xy',
    followTouchMove: false,
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    followPointer: false,
    animation: false,
   },
   accessibility: {
    enabled: false,
   },
   title: {
    text: this.chartname,
    align: 'center',
   },
   plotOptions: {
    line: {
     dataLabels: {
      enabled: false,
     },
    },
    series: {
     enableMouseTracking: true,
     states: {
      inactive: {
       opacity: 1,
      },
     },
     events: {
      legendItemClick: function () {
       return false;
      },
     },
    },
   },
   xAxis: {
    labels: {
     groupedOptions: [
      {
       rotation: 0,
      },
     ],
     rotation: 0,
     y: 20,
    },
    categories: this.categories,
   },
   yAxis: [
    {
     softMax: Number(this.softMax),
     labels: {
      format: this.percentage ? '{value}%' : '{value}',
      style: {
       color: Highcharts.getOptions().colors[1],
      },
     },
     title: {
      text: '',
      style: {
       color: Highcharts.getOptions().colors[1],
      },
     },
     opposite: true,
    },

    {
     // Secondary yAxis
     title: {
      text: '',
      style: {
       color: Highcharts.getOptions().colors[0],
      },
     },
     labels: {
      format: '{value}',
      style: {
       color: Highcharts.getOptions().colors[0],
      },
     },
    },
   ],
   tooltip: {
    shared: true,
   },
   legend: {
    align: 'center',
    x: 100,
    verticalAlign: 'bottom',
    // y: 100,
    floating: false,
    backgroundColor:
     Highcharts.defaultOptions.legend.backgroundColor || // theme
     'rgba(255,255,255,0.25)',
   },
   series: this.setseries,
  });
 }
}
