import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MapResponse } from '../../../../model/server-responses'

@Injectable({
  providedIn: 'root'
})
export class MapService {

  mapUrl = 'http://localhost:3000/map'

  constructor(private http: HttpClient) { }

  
  getTerrain(): Observable<Object> {
    return this.http.get(this.mapUrl);
  }
}
