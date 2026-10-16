import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { ChartData, ChartOptions } from 'chart.js';
// import { BaseChartDirective } from 'ng2-charts';
import { LanguageService } from 'src/app/shared/service/language.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { HomeService } from '../../home.service';

declare var require: any;
var Highcharts = require('highcharts'),
 HighchartsGroupedCategories = require('highcharts-grouped-categories')(Highcharts);

@Component({
 selector: 'app-chart',
 templateUrl: './chart.component.html',
 styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
 @ViewChild('cart1') chart1: ElementRef | undefined;
 //  @ViewChild(BaseChartDirective) baseChart: BaseChartDirective | undefined;
 title = '';
 type: any = 'ComboChart';

 charttab = 'tab1';
 chartData = {
  data: [
   ['2012-IV', 1180.16, 7.2, 0.6],
   ['2013-I', 1375.95, 40.48, 2.95],
   ['2013-II', 2455.3, 25.17, 1.03],
   ['2013-III', 1991.13, 21.17, 1.06],
  ],
  columnNames: ['Зах зээлийн үнэлгээ /тэрбум.төг/', 'Үнэт цаасны арилжааны хэмжээ /тэрбум.төг/', 'Хөрвөх чадвар /хувь/'],
  classicOptions: {
   series: {
    0: { targetAxisIndex: 0, type: 'bars' },
    1: { targetAxisIndex: 0, type: 'bars' },
    2: { targetAxisIndex: 1, type: 'line' },
   },
   legend: {
    position: 'bottom',
   },
  },
 };

 //  salesData: ChartData<'bar'> = {
 //   labels: ['2013-I', '2013-II', '2013-III', '2013-IV'],
 //   datasets: [
 //    { label: 'Зах зээлийн үнэлгээ /тэрбум.төг/', data: [1000, 1200, 1050, 2000] },
 //    { label: 'Үнэт цаасны арилжааны хэмжээ /тэрбум.төг/', data: [200, 100, 400, 50] },
 //    { label: 'Хөрвөх чадвар /хувь/', data: [200, 100, 400, 50] },
 //   ],
 //  };

 //  chartOptions: ChartOptions = {
 //   responsive: true,
 //   plugins: {
 //    title: {
 //     display: true,
 //    },
 //   },
 //  };

 site: any;
 lang: any;
 chart: any[] | undefined;
 chartitem: any[] | undefined;
 chartvalue: any[] | undefined;
 valueName: any[] = [];
 chartname: any;
 tabname: any;
 siteinfo: any;
 chartcount = 0;
 //  width = window.innerWidth * 0.18;
 //  height = 400;
 categories: any;
 percentage = false;
 chartitemid: any;
 setseries: any;
 setdata: any;
 softMax: any;
 loading = false;

 isMobile = false;
 salesData: any;
 baseChart: any;

 //  {
 //   name: '2017',
 //   categories: ['I', 'II', 'III', 'IV'],
 //  },
 //  {
 //   name: '2018',
 //   categories: ['I', 'II', 'III', 'IV'],
 //  },
 //  {
 //   name: '2019',
 //   categories: ['I', 'II', 'III', 'IV'],
 //  },
 //  {
 //   name: '2020',
 //   categories: ['I', 'II', 'III', 'IV'],
 //  },
 //  {
 //   name: '2021',
 //   categories: ['I', 'II', 'III', 'IV'],
 //  },
 //  {
 //   name: '2022',
 //   categories: ['I', 'II', 'III', 'IV'],
 //  },
 //  {
 //   name: '2023',
 //   categories: ['I'],
 //  },

 constructor(private homeService: HomeService, private loaderService: LoaderService, private language: LanguageService) {}

 ngOnInit(): void {
  this.language.setLanguage();
  this.siteinfo = { lang: 'mn', site: 'main' };
  this.language.loadLang.subscribe((lang: any) => {
   this.siteinfo.lang = lang;
  });

  const userAgent: string = navigator.userAgent || navigator.vendor || (window as any).opera || undefined;
  const isMobileDevice = (): boolean => {
   const regexs = [/(Android)(.+)(Mobile)/i, /BlackBerry/i, /iPhone|iPod/i, /Opera Mini/i, /IEMobile/i];
   return regexs.some((b) => userAgent.match(b));
  };
  const isTabletDevice = (): boolean => {
   const regex = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/;
   return regex.test(userAgent.toLowerCase());
  };
  const isMobile = isMobileDevice();
  const isTablet = isTabletDevice();

  this.isMobile = isMobile ? true : isTablet ? true : false;

  // console.log(isMobile);
  this.loadChart();
  //   this.chartHeight = window.innerHeight * 0.35;
  //   this.chartWidth = window.innerWidth * 0.18;
 }

 loadChart() {
  // this.loaderService.show('');
  this.homeService.chartlist(this.siteinfo, 'active').subscribe({
   next: (result) => {
    this.loaderService.hide();
    const chart: any[] = JSON.parse(JSON.stringify(result));
    this.chart = chart?.sort((a, b) => (a.iDs !== b.iDs ? (a.iDs < b.iDs ? -1 : 1) : 0));
    // console.log(this.chart);
    this.chartcount = this.chart.length;
    this.charttab = this.chart[0]?.iDs;
    this.softMax = this.chart[0]?.maxvalue;
    this.percentage = this.chart[0]?.ispercentage;
    this.loadChartItem(this.chart[0]?.iDs);
    this.chartname = this.chart[0]?.chartname;
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
    this.chartvalue?.forEach((x) => {
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
  // [
  //   {
  //    name: 'Precipitation',
  //    color: 'rgb(58, 99, 172)',
  //    type: 'column',
  //    yAxis: 1,
  //    data: [
  //     27.6, 28.8, 21.7, 34.1, 29.0, 28.4, 45.6, 51.7, 39.0, 60.0, 28.6, 32.1, 27.6, 28.8, 21.7, 34.1, 29.0, 28.4, 45.6, 51.7, 39.0, 60.0,
  //     28.6, 32.1, 28.8,
  //    ],
  //    tooltip: {
  //     valueSuffix: '',
  //    },
  //   },
  //   {
  //    name: 'Precipitation',
  //    color: 'rgb(200, 39, 47)',
  //    type: 'column',
  //    yAxis: 1,
  //    data: [
  //     28.8, 21.7, 34.1, 29.0, 28.4, 45.6, 51.7, 39.0, 60.0, 28.6, 32.1, 27.6, 28.8, 21.7, 34.1, 29.0, 28.4, 45.6, 51.7, 39.0, 60.0, 28.6,
  //     32.1, 27.6, 32.1,
  //    ],
  //    tooltip: {
  //     valueSuffix: '',
  //    },
  //   },
  //   {
  //    name: 'Temperature',
  //    color: 'rgb(117, 117, 117)',
  //    type: 'spline',
  //    data: [
  //     -13.6, -14.9, -5.8, -0.7, 3.1, 13.0, 14.5, 10.8, 5.8, -0.7, -11.0, -16.4, -13.6, -14.9, -5.8, -0.7, 3.1, 13.0, 14.5, 10.8, 5.8, -0.7,
  //     -11.0, -16.4, -16.4,
  //    ],
  //    tooltip: {
  //     valueSuffix: '',
  //    },
  //   },
  //  ],

  // console.log(this.categories);
  // console.log(this.setseries);
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

 //  resetWindowSize(event: any) {
 //   //Reset the width and height based on current window size
 //   this.chartWidth = event.target.innerWidth;
 //   //   this.chartHeight = event.target.innerHeight;
 //   //   makeGraph();
 //  }

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
  // this.filterChartItem();
  //   console.log(this.tabname);
 }

 duplicateRemovechartName(chartname: any) {
  this.valueName.filter((z) => z === chartname).length === 0 ? this.valueName.push(chartname) : null;
 }

 //  filterChartItem() {
 //   this.chartData.columnNames = [];
 //   this.chartitem?.forEach((x) => {
 //    this.chartData.columnNames.push(x.chartname);
 //    this.filterChartValue(x.iDs, x.chartname);
 //   });
 //  }

 //  filterChartValue(_chartItemId: any, chartItemName: any) {
 //   this.chartData.data = [];
 //   this.salesData.labels = [];

 //   this.valueName.forEach((x) => {
 //    this.filterOnlyValue(x, chartItemName);
 //   });
 //   //   console.log(this.chartData.data);
 //   //   console.log(this.chartvalue?.filter((x) => x.chartitemId === chartItemId));
 //  }

 //  filterOnlyValue(chartName: any, chartItemName: any) {
 //   let ddd = this.chartvalue?.filter((x) => x.chartname === chartName);

 //   let dd: any[] = [];
 //   let ng: any[] = [];
 //   if (ddd!.length > 0) {
 //    dd.push(chartName);
 //    this.salesData.labels?.push(chartName);

 //    ddd?.forEach((x) => {
 //     dd.push(x.chartvalue);
 //    });
 //    this.chartData.data?.push(dd);
 //   }
 //   //   console.log(dd);

 //   if (this.chartData.data.length === 0) {
 //    this.chartData.columnNames = [];
 //   }

 //   // this.baseChart?.update();
 //  }

 //  filterChartItem1(chartId: any) {
 //   // console.log(this.chartvalue);

 //   //   console.log(this.salesData.datasets);
 //   const chartItems = this.chartitem?.filter((x) => x.chartId === chartId).sort((a, b) => (a.iDs !== b.iDs ? (a.iDs < b.iDs ? -1 : 1) : 0));
 //   let chartVal: any[] = [];
 //   this.chartData.columnNames = [];
 //   this.salesData.labels = [];
 //   this.salesData.datasets = [];
 //   chartItems?.forEach((x) => {
 //    this.chartData.columnNames.push(x.chartname);
 //    //    this.salesData.labels?.push(x.chartname);
 //    //    console.log(x);
 //    let valueChart: any;
 //    valueChart = this.chartvalue?.filter((y) => y.chartitemId === x.iDs).sort((a, b) => (a.iDs !== b.iDs ? (a.iDs < b.iDs ? -1 : 1) : 0));
 //    let valueName: any[] = [];

 //    //    valueName.push(
 //    //     valueChart?.forEach((y) => {
 //    //      y.chartname;
 //    //     })
 //    //    );

 //    valueChart.forEach((y: { chartname: unknown }) => {
 //     this.valueName.filter((z) => z === y.chartname).length === 0 ? this.valueName.push(y.chartname) : null;
 //     this.salesData.labels?.push(y.chartname);
 //     // chartVal.push(y?.chartvalue);
 //     // console.log(y.chartvalue);
 //    });

 //    this.valueName
 //     .sort((a, b) => (a !== b ? (a < b ? -1 : 1) : 0))
 //     .forEach((z) => {
 //      this.chartData.data.push(z);
 //      const valueData = this.valueName
 //       .filter((x) => x.chartname === z)
 //       .sort((a, b) => (a.chartitemname !== b.chartitemname ? (a.chartitemname < b.chartitemname ? -1 : 1) : 0));

 //      valueData.forEach((c) => {
 //       this.chartData.data.push(c.chartvalue);
 //      });
 //     });

 //    const dd = { label: x.chartname, data: chartVal };
 //    //    console.log(dd);
 //    this.salesData.datasets.push(dd);
 //   });

 //   this.chart1?.nativeElement.update();
 //   this.baseChart?.update();

 //   //   console.log(this.chartData.columnNames);
 //   //   console.log(this.salesData.datasets);
 //   //   console.log(this.salesData.labels);
 //   //   this.chartData.columnNames = [];

 //   //   this.chartData.data = [];
 //  }
}
