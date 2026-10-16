import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccordionComponent } from './component/accordion/accordion.component';
import { DecreeComponent } from './component/decree/decree.component';
import { FilesComponent } from './component/files/files.component';
import { GetComponent } from './component/get/get.component';
import { ListComponent } from './component/list/list.component';
import { PictureListComponent } from './component/picture-list/picture-list.component';

const routes: Routes = [
 { path: '', pathMatch: 'full', redirectTo: 'list' },
 {
  path: 'list',
  component: ListComponent,
 },
 {
  path: 'list/:id',
  component: ListComponent,
 },
 {
  path: 'accordion',
  component: AccordionComponent,
 },
 {
  path: 'accordion/:id',
  component: AccordionComponent,
 },
 {
  path: 'decree',
  component: DecreeComponent,
 },
 {
  path: 'decree/:id',
  component: DecreeComponent,
 },
 {
  path: 'vote',
  component: GetComponent,
 },
 {
  path: 'vote/:id',
  component: GetComponent,
 },
 {
  path: 'file',
  component: FilesComponent,
 },
 {
  path: 'file/:id',
  component: FilesComponent,
 },

 {
  path: 'picture',
  component: PictureListComponent,
 },
 {
  path: 'picture/:id',
  component: PictureListComponent,
 },
];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule],
})
export class DocRoutingModule {}
