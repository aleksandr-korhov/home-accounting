import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { BaseApi } from '../../../shared/core/base-api';
import { HmEvent } from '../models/event.model';

@Injectable()
export class EventService extends BaseApi {
  constructor(protected http: HttpClient) {
    super(http);
  }

  addEvent(event: HmEvent): Observable<HmEvent> {
    return this.post('events', event);
  }

  getEvents(): Observable<HmEvent[]> {
    return this.get('events');
  }
}
