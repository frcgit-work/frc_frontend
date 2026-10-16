import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ConfirmDialogService } from '../../service/confirm-dialog.service';

@NgModule({
 declarations: [ConfirmDialogComponent],
 imports: [BrowserModule, CommonModule],
 exports: [ConfirmDialogComponent],
 providers: [ConfirmDialogService],
})
export class ConfirmDialogModule {}
