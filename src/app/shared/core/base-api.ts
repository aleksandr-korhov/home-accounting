import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BaseApi {

  private baseUrl = 'http://localhost:3000/';

  constructor(protected http: HttpClient) {}

  protected getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }

  protected get(url: string = ''): Observable<any> {
    return this.http.get(this.getUrl(url));
  }

  protected post(url: string = '', params: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), params);
  }

  protected put(url: string = '', params: any = {}): Observable<any> {
    return this.http.put(this.getUrl(url), params);
  }
}
