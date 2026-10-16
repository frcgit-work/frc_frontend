import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessCardComponent } from './business-card/business-card.component';
import { ContactComponent } from './contact/contact.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { MainComponent } from './main/main.component';
import { MembersComponent } from './members/members.component';
import { SearchComponent } from './search/search.component';
import { DecreeComponent } from './sector/component/decree/decree.component';
import { SectorComponent } from './sector/sector.component';
import { OrgsComponent } from './sectors/component/orgs/orgs.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoViewComponent } from './video-view/video-view.component';
import { ViewComponent } from './view/view.component';
import { FaqComponent } from './faq/faq.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { View1Component } from './view1/view1.component';
import { ChartFrameComponent } from './chart-frame/chart-frame.component';

const routes: Routes = [
 { path: '', pathMatch: 'full', redirectTo: 'home' },
 //  { path: 'home', component: HomeComponent },
 //  { path: 'home/:lang', component: HomeComponent },
 { path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule) },
 { path: 'list', component: ListComponent },
 { path: 'list/:id', component: ListComponent },
 { path: 'sct', loadChildren: () => import('./sectors/sectors.module').then((m) => m.SectorsModule) },
 //  { path: 'sct', component: SectorComponent },
 { path: 'sct/:id', loadChildren: () => import('./sectors/sectors.module').then((m) => m.SectorsModule) },

 //  { path: 'sct/d', component: DecreeComponent },
 //  { path: 'sct/d/:id', component: DecreeComponent },
 { path: 'member', component: MembersComponent },
 { path: 'member/:id', component: MembersComponent },
 { path: 'p/:id', component: BusinessCardComponent },
 { path: 'view', component: ViewComponent },
 { path: 'view/:id', component: ViewComponent },
 { path: 'content', component: View1Component },
 { path: 'content/:id', component: View1Component },
 { path: 'feedback', component: FeedbackComponent },
 { path: 'contact', component: ContactComponent },
 { path: 'contact/:id', component: ContactComponent },
 { path: 'org', pathMatch: 'full', redirectTo: 'sct;id=11' },
 { path: 'org/:id', pathMatch: 'full', redirectTo: 'sct;id=11' },
 { path: 'video', component: VideoListComponent },
 { path: 'video/:id', component: VideoListComponent },
 { path: 'video-view', component: VideoViewComponent },
 { path: 'video-view/:id', component: VideoViewComponent },
 { path: 'search', component: SearchComponent },
 { path: 'search/:q', component: SearchComponent },
 { path: 'doc', loadChildren: () => import('./doc/doc.module').then((m) => m.DocModule) },
 { path: 'main', component: MainComponent },
 { path: 'faq', component: FaqComponent },
 { path: 'faq/:q', component: FaqComponent },
 { path: 'schedule', component: ScheduleComponent },
 { path: 'schedule/:q', component: ScheduleComponent },
 { path: 'decision', loadChildren: () => import('./sectors/sectors.module').then((m) => m.SectorsModule) },
 { path: 'decision/:id', loadChildren: () => import('./sectors/sectors.module').then((m) => m.SectorsModule) },
 { path: 'p/c/:q', redirectTo: 'list;id=31' },
 { path: 'chart', component: ChartFrameComponent },
 { path: 'chart/:q', component: ChartFrameComponent },
 //  { path: 'doc/:id', component: DocComponent },
 //  { path: 'mw', loadChildren: () => import('./mw/mw.module').then((m) => m.MWModule) },
];

@NgModule({
 imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', useHash: true })],
 exports: [RouterModule],
})
export class AppRoutingModule {}
