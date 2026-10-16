import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocRoutingModule } from './doc-routing.module';
// import { DocComponent } from './doc/doc.component';
import { ListComponent } from './component/list/list.component';
import { AccordionComponent } from './component/accordion/accordion.component';
import { RouterModule } from '@angular/router';
import { DecreeComponent } from './component/decree/decree.component';
import { GetComponent } from './component/get/get.component';
import { FilesComponent } from './component/files/files.component';
import { PictureListComponent } from './component/picture-list/picture-list.component';

@NgModule({
 declarations: [ListComponent, AccordionComponent, DecreeComponent, GetComponent, FilesComponent, PictureListComponent],
 imports: [CommonModule, DocRoutingModule],
})
export class DocModule {}
