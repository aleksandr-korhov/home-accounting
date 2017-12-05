import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BaseApi {

  private baseUrl = 'http://localhost:3000/';

  constructor(protected http: HttpClient) {}

  private getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }

  public get(url: string = ''): Observable<any> {
    return this.http.get(this.getUrl(url));
  }

  public post(url: string = '', params: any = {}): Observable<any> {
    return this.post(this.getUrl(url), params);
  }

  public put(url: string = '', params: any = {}): Observable<any> {
    return this.http.put(this.getUrl(url), params);
  }
}
