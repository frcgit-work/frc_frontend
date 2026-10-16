import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
 providedIn: 'root',
})
export class FileuploadService {
 constructor(private http: HttpClient) {}
 public progress: number = 0;
 public message: string | undefined;
 apiUrl = environment.apiUrl + '/api/';

 @Output() public onUploadFinished = new EventEmitter();

 fileupload(formData: any, folder: string): Observable<any> {
  return this.http.post(this.apiUrl + 'upload?folder=' + folder, formData, { reportProgress: true, observe: 'events' });
  //.subscribe((event) => {});
 }
}
